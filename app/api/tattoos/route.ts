import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/services/db/getCurrentUser";
import prisma from "@/lib/prismadb";
import { ArtistService } from "@/services/db/ArtistService";
import { TattooService } from "@/services/db/TattooService";
import {
    ApiRequestBody,
    ApiResponse,
    TTattooWDTagsWStylesWBodyPartWArtistProfile,
} from "@/types";
import {
    TattooForm,
    tattooFormSchema,
} from "@/app/(site)/artist/tatuajes/[tattooId]/TattooEditPageClient";
import { ArtistProfile, Tattoo, User } from "@prisma/client";
import { z } from "zod";

export async function GET(req: NextRequest) {
    const url = new URL(req.nextUrl); // Create a URL object

    const searchparamsObj = Object.fromEntries(url.searchParams);

    const originalTake = parseInt(searchparamsObj.pageSize) || 10;
    const take = originalTake + 1; // we add one to the take to know if there are more pages
    const skip =
        (Number.parseInt(searchparamsObj.page) - 1) *
        Number.parseInt(searchparamsObj.pageSize);

    const currentPage = parseInt(searchparamsObj.page) || 1;

    try {
        const tattoos = await TattooService.getPaginated(
            searchparamsObj,
            skip,
            take,
        );

        // if original take is 10 and we get 11 items, we know there are more pages
        let hasMorePages = false;
        if (tattoos.length > originalTake) {
            hasMorePages = true;
            tattoos.pop(); // remove the extra item
        }

        const previousPage = currentPage > 1 ? currentPage * 1 - 1 : undefined;

        const nextPage = hasMorePages ? currentPage * 1 + 1 : undefined;

        return NextResponse.json({
            data: tattoos,
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

export async function POST(request: NextRequest) {
    const currentUser = await getCurrentUser();

    let artistProfile: ArtistProfile | undefined | null = undefined;

    function isArtist(user: unknown): user is ArtistProfile {
        // First, check if profile is an object and has a property 'role'
        return (
            typeof user === "object" &&
            user !== null &&
            "role" in user &&
            (user as User).role === "ARTIST"
        );
    }

    function isAdmin(user: unknown): user is User {
        // First, check if profile is an object and has a property 'role'
        return (
            typeof user === "object" &&
            user !== null &&
            "role" in user &&
            (user as User).role === "ADMIN"
        );
    }

    if (!isArtist(currentUser) && !isAdmin(currentUser)) {
        return NextResponse.json(
            { error: { message: "No autorizado" }, statusCode: 400 },
            { status: 400 },
        );
    }

    if (isArtist(currentUser)) {
        artistProfile = await ArtistService.getById(
            currentUser.artistProfileId,
        );

        if (!artistProfile) {
            return {
                errorResponse: NextResponse.json(
                    { error: "Profile not found" },
                    { status: 404 },
                ),
            };
        }
    }

    if (isAdmin(currentUser)) {
        artistProfile = undefined;
    }

    const body: TattooPublicApiRequestBody<"CREATE"> = await request.json();

    let newTattoo = { ...body.data, artistProfile };

    const listing = await TattooService.create(newTattoo);

    const resBody: TattooPublicApiResponse<"CREATE"> = {
        data: listing,
        message: "Tattoo created",
        ok: true,
        statusCode: 200,
    };

    return NextResponse.json(resBody, { status: 201 });
}

// same as POST
export async function PUT(request: NextRequest) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.json(
            { error: { message: "No autorizado" }, statusCode: 400 },
            { status: 400 },
        );
    }

    const artistProfile = await ArtistService.getById(
        currentUser.artistProfileId,
    );

    if (!artistProfile) {
        return NextResponse.json(
            { error: { message: "Artist profile not found" }, statusCode: 404 },
            { status: 404 },
        );
    }

    const body: TattooPublicApiRequestBody<"UPDATE"> = await request.json();

    const currentTattoo: TTattooWDTagsWStylesWBodyPartWArtistProfile | null =
        await TattooService.getById(body.data.tattooId, {
            includeTags: true,
            includeBodyPart: true,
        });

    const updatedTattoo = { ...body.data, artistProfile };

    if (!currentTattoo) {
        return NextResponse.json(
            { error: { message: "Tattoo not found" }, statusCode: 404 },
            { status: 404 },
        );
    }

    const updatedDBTattoo = await TattooService.update(
        currentTattoo,
        updatedTattoo,
    );

    const resBody: TattooPublicApiResponse<"UPDATE"> = {
        data: undefined,
        message: "Tattoo updated",
        ok: true,
        statusCode: 200,
    };

    return NextResponse.json(updatedDBTattoo);
}

type TattooApiMap = {
    CREATE: {
        reqData: TattooForm;
        resData: Tattoo;
    };
    UPDATE: {
        reqData: TattooForm;
        resData: void;
    };
    PROCESS_MANY: {
        reqData: { tattooIds: string[] };
        resData: z.infer<typeof tattooFormSchema>;
    };
};
// Define the actions that can be performed
type TattooActions = keyof TattooApiMap;

export interface TattooPublicApiResponse<A extends TattooActions> // Given the studio action
    extends ApiResponse<TattooApiMap[A]["resData"], A> {} // Create the ApiResponse using the response data type from the map

// Specialized ApiRequestBody for Studio actions
export type TattooPublicApiRequestBody<A extends TattooActions> = // Pick the request data type from the map
    ApiRequestBody<TattooApiMap[A]["reqData"], A>; // and create the ApiRequestBody using it
