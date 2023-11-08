import { getArtists } from "@/actions/getArtists";
import { NextResponse } from "next/server";

export async function GET(req) {
  console.log("got here!");

  const url = new URL(req.nextUrl); // Create a URL object

  const searchparamsObj = Object.fromEntries(url.searchParams); // get the search params and convert them to an object

  const originalTake = parseInt(searchparamsObj.pageSize) || 10;
  const take = originalTake + 1; // we add one to the take to know if there are more pages
  const skip = (searchparamsObj.page - 1) * searchparamsObj.pageSize || 0;

  const currentPage = parseInt(searchparamsObj.page) || 1;

  const artists = await getArtists(searchparamsObj, skip, take);

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
    return NextResponse.error(error);
  }
}
