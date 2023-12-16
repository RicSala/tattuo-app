import { ArtistService } from "@/services/db/ArtistService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = req.nextUrl; // Create a URL object
    // Student: what's the difference between an URL object and just an object?
    // Teacher: URL objects have a lot of useful methods for working with URLs, like searchParams or pathname
    // NextJs: nextUrl is a URL object that has been parsed from the incoming request already

    const searchparamsObj = Object.fromEntries(url.searchParams); // get the search params and convert them to an object

    const originalTake = parseInt(searchparamsObj.pageSize) || 10;
    const take = originalTake + 1; // we add one to the take to know if there are more pages
    const skip =
        (Number.parseInt(searchparamsObj.page) - 1) *
            Number.parseInt(searchparamsObj.pageSize) || 0;

    const currentPage = parseInt(searchparamsObj.page) || 1;

    const artists = await ArtistService.getPaginated(
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
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
        // NextResponse.error is a helper function that returns an error response
        // Student: in Nextjs, is it the same as: NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })..?
        // Teacher: yes, it's the same
    }
}
