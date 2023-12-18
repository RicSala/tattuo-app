import { StudioFormValues } from "@/app/(site)/studio/claim/[studioId]/useStudioForm";
import { StudioService } from "@/services/db/StudioService";
import {
    InviteFormBody,
    ApiResponse,
    inviteFormBody,
    ExitFormBody,
    ApiRequestBody,
    ApiError,
    //   ApiRequestBody,
} from "@/types";
import { Invite, Studio } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<any> {
    const url = new URL(req.nextUrl); // Create a URL object

    const searchparamsObj = Object.fromEntries(url.searchParams); // get the search params and convert them to an object

    const originalTake = parseInt(searchparamsObj.pageSize) || 10;
    const take = originalTake + 1; // we add one to the take to know if there are more pages
    const skip =
        (Number.parseInt(searchparamsObj.page) - 1) *
            Number.parseInt(searchparamsObj.pageSize) || 0;

    const currentPage = parseInt(searchparamsObj.page) || 1;

    const artists = await StudioService.getPaginated(
        searchparamsObj,
        skip,
        take,
    );

    // if original take is 10 and we get 11 items, we know there are more pages
    let hasMorePages = false;
    if (artists.length > originalTake) {
        hasMorePages = true;
        artists.pop(); // remove the extra item
    }

    const previousPage = currentPage > 1 ? currentPage * 1 - 1 : undefined;

    const nextPage = hasMorePages ? currentPage * 1 + 1 : undefined;

    try {
        return NextResponse.json({
            data: artists,
            sort: {
                field: "createdAt",
                order: "desc",
            },
            pagination: {
                nextPage,
                previousPage,
                hasMorePages,
            },
        });
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.error();
    }
}

//TODO: ../studio/claim/[studioId]/useStudioForm.ts
export async function POST(request: NextRequest): Promise<any> {
    console.log("Receiving udpated studio information...");
    try {
        const body = await request.json();
        const { action } = body;

        let resData;
        let resMessage: string;

        switch (action) {
            case "UPDATE":
                resData = (await StudioService.update(
                    (body as StudioApiRequestBody<"UPDATE">).data,
                )) as StudioApiResponse<"UPDATE">["data"]; // assert to the type of the response data for update
                resMessage = "Studio updated";
                break;

            case "CREATE":
                resData = (await StudioService.create(
                    (body as StudioApiRequestBody<"CREATE">).data,
                )) as StudioApiResponse<"CREATE">["data"]; // assert to the type of the response data for CREATE
                resMessage = "Studio CREATEd";
                break;

            case "DELETE":
                resData = (await StudioService.delete(
                    (body as StudioApiRequestBody<"DELETE">).data.studioId,
                )) as StudioApiResponse<"DELETE">["data"]; // assert to the type of the response data for DELETE
                resMessage = "Studio DELETEd";
                break;

            case "INVITE":
                resData = (await StudioService.invite(
                    (body as StudioApiRequestBody<"INVITE">).data,
                )) as StudioApiResponse<"INVITE">["data"]; // assert to the type of the response data for INVITE
                resMessage = "Studio INVITEd";
                break;

            case "ACCEPT_INVITE":
                resData = (await StudioService.acceptInvite(
                    (body as StudioApiRequestBody<"ACCEPT_INVITE">).data
                        .inviteId,
                )) as StudioApiResponse<"ACCEPT_INVITE">["data"];

                resMessage = "Artist invited";
                break;

            case "REJECT_INVITE":
                resData = (await StudioService.rejectInvite(
                    (body as StudioApiRequestBody<"REJECT_INVITE">).data
                        .inviteId,
                )) as StudioApiResponse<"REJECT_INVITE">["data"];

                resMessage = "Artist invited";
                break;

            case "EXIT":
                resData = (await StudioService.exitStudio(
                    (body as StudioApiRequestBody<"EXIT">).data.studioId,
                    (body as StudioApiRequestBody<"EXIT">).data.artistId,
                )) as StudioApiResponse<"EXIT">["data"];

                resMessage = "Studio EXITed";
                break;

            default:
                break;
        }

        //   REVIEW: How can we type the response itself? is it possible and useful?
        const resBody: ApiResponse<any> = {
            data: resData,
            message: resMessage,
            ok: true,
            statusCode: 200,
        };

        return NextResponse.json(resBody, { status: 200 });
        // Save the file to the local filesystem
    } catch (error) {
        console.log("catched!!!! error: ", error);
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }
}

export type StudioUpdateResponse = StudioApiResponse<"DELETE">;

// Define a map of the actions and their corresponding request and response data types
type studioApiMap = {
    UPDATE: {
        reqData: StudioFormValues;
        resData: Studio;
    };
    CREATE: {
        reqData: StudioFormValues;
        resData: Studio;
    };
    DELETE: {
        reqData: { studioId: string };
        resData: Studio | null;
    };
    INVITE: {
        reqData: inviteFormBody;
        resData: void;
    };
    ACCEPT_INVITE: {
        reqData: { inviteId: string }; // inviteId
        resData: Invite;
    };
    REJECT_INVITE: {
        reqData: { inviteId: string }; // inviteId
        resData: Invite;
    };
    EXIT: {
        reqData: ExitFormBody;
        resData: Studio;
    };
    // ... other actions
};

// Define the actions that can be performed
type StudioActions = keyof studioApiMap;

export interface StudioApiResponse<A extends StudioActions> // Given the studio action
    extends ApiResponse<studioApiMap[A]["resData"], A> {} // Create the ApiResponse using the response data type from the map

// Specialized ApiRequestBody for Studio actions
export type StudioApiRequestBody<A extends StudioActions> = // Pick the request data type from the map
    ApiRequestBody<studioApiMap[A]["reqData"], A>; // and create the ApiRequestBody using it

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import { StudioFormValues } from "@/app/(site)/studio/claim/[studioId]/useStudioForm";
// import { StudioService } from "@/services/db/StudioService";
// import { ApiRequestBody, ApiResponse } from "@/types";
// import { Studio } from "@prisma/client";
// import { NextRequest, NextResponse } from "next/server";

// async function handleStudioAction<T extends StudioAction>(
//   action: T,
//   body: StudioActionMap[T]["Request"],
// ): Promise<{ responseData: StudioActionMap[T]["Response"]; message: string }> {
//   let responseData: StudioActionMap[T]["Response"];
//   let message = "";

//   switch (action) {
//     case "UPDATE":
//       responseData = await StudioService.update(body.data);
//       message = "Studio updated successfully";
//       break;
//     case "CREATE":
//       responseData = await StudioService.create(body.data);
//       message = "Studio created successfully";
//       break;
//     case "DELETE":
//       responseData = await StudioService.delete(body.data.id);
//       message = "Studio deleted successfully";
//       break;
//   }

//   return { responseData, message };
// }

// export async function POST(request: NextRequest): Promise<any> {
//   //   console.log("Receiving udpated studio information...");
//   //   try {
//   const body: ApiRequestBody = await request.json();
//   //     const { action, data } = body;

//   //     let resData: StudioActionResponses;
//   //     let resMessage: string;
//   // Usage
//   const { action, data } = body;
//   const requestData = body as StudioActionMap[typeof action]["Request"];
//   const { responseData, message } = await handleStudioAction(
//     action,
//     requestData,
//   );

//   const resBody: ApiResponse<typeof responseData> = {
//     data: responseData,
//     message: message,
//     ok: true,
//     statusCode: 200,
//     // ... other fields if needed
//   };

//   return NextResponse.json(resBody, { status: 200 });
// }

// type StudioActionMap = {
//   UPDATE: {
//     Request: ApiRequestBody<StudioFormValues>;
//     Response: StudioActionApiRes["UPDATE"];
//   };
//   CREATE: {
//     Request: ApiRequestBody<StudioFormValues>;
//     Response: StudioActionApiRes["CREATE"];
//   };
//   DELETE: {
//     Request: ApiRequestBody<Studio>;
//     Response: StudioActionApiRes["DELETE"];
//   };
//   // Add other actions as needed
// };

// type StudioAction = keyof StudioActionMap;

// type StudioActionApiRes = {
//   UPDATE: Studio;
//   CREATE: Studio;
//   DELETE: Studio | null; // Assuming delete returns null or Studio
//   INVITE: void; // Adjust based on actual return type
//   // ... other actions
// };
