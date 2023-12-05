import { ArtistService } from "@/services/db/ArtistService";
import { StudioService } from "@/services/db/StudioService";
import { ApiResponse } from "@/types";
import { ca } from "date-fns/locale";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: any): Promise<any> {
  const url = new URL(req.nextUrl); // Create a URL object

  const searchparamsObj = Object.fromEntries(url.searchParams); // get the search params and convert them to an object

  const originalTake = parseInt(searchparamsObj.pageSize) || 10;
  const take = originalTake + 1; // we add one to the take to know if there are more pages
  const skip =
    (Number.parseInt(searchparamsObj.page) - 1) *
      Number.parseInt(searchparamsObj.pageSize) || 0;

  const currentPage = parseInt(searchparamsObj.page) || 1;

  const artists = await StudioService.getPaginated(searchparamsObj, skip, take);

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

export async function POST(request: NextRequest): Promise<any> {
  console.log("Receiving udpated studio information...");
  try {
    const body = await request.json();
    console.log("body: ", body);
    const { action, data } = body;
    // delete the field .confirm from data:
    delete data.confirm;
    // TODO: add to db????
    // switch on action
    switch (action) {
      case "UPDATE":
        // update the studio
        const studio = await StudioService.update(data);
        console.log("studio: ", studio);
        break;
      case "CREATE":
        // create the studio
        const newStudio = await StudioService.create(data);
        console.log("newStudio: ", newStudio);
        break;
      case "DELETE":
        // delete the studio
        const deletedStudio = await StudioService.delete(data.id);
        console.log("deletedStudio: ", deletedStudio);
        break;
      default:
        break;
    }

    // Save the file to the local filesystem
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.error();
  }

  // the first param goes on .data already...

  return NextResponse.json(
    { data: null, message: "Updated studio info", ok: "true", status: "200" },
    { status: 200 },
  );
}
