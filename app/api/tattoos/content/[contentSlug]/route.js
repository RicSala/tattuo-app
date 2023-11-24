import { NextResponse } from "next/server";
import { getCurrentUser } from "@/services/db/getCurrentUser";
import prisma from "@/lib/prismadb";
import { ArtistService } from "@/services/db/ArtistService";
import { TattooService } from "@/services/db/TattooService";
import { createBaseError } from "@/errors/CustomError";
import { mapValueToLabel } from "@/lib/getStyleList";

export async function GET(req, { params }) {
  const { contentSlug } = params;
  const url = new URL(req.nextUrl); // Create a URL object

  let searchparamsObj = Object.fromEntries(url.searchParams);
  // searchparamsObj.styles = styleName;

  const originalTake = parseInt(searchparamsObj.pageSize) || 10;
  const take = originalTake + 1; // we add one to the take to know if there are more pages
  const skip = (searchparamsObj.page - 1) * searchparamsObj.pageSize;

  const currentPage = parseInt(searchparamsObj.page) || 1;

  const tattoos = await TattooService.getPaginated(
    {
      ...searchparamsObj,
      // we are modifying the searchParams to add the contentSlug string
      freeSearch: contentSlug.slice(0, -1),
    },
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

  try {
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
    return NextResponse.error(error);
  }
}
