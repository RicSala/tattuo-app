import { NextResponse } from "next/server";
import { getCurrentUser } from "@/services/db/getCurrentUser";
import prisma from "@/lib/prismadb";
import { ArtistService } from "@/services/db/ArtistService";
import { TattooService } from "@/services/db/TattooService";
import { createBaseError } from "@/errors/CustomError";

export async function GET(req) {
  const url = new URL(req.nextUrl); // Create a URL object

  console.log("¡¡url!! ", url);

  const searchparamsObj = Object.fromEntries(url.searchParams);

  const originalTake = parseInt(searchparamsObj.pageSize) || 10;
  const take = originalTake + 1; // we add one to the take to know if there are more pages
  const skip = (searchparamsObj.page - 1) * searchparamsObj.pageSize;

  const currentPage = parseInt(searchparamsObj.page) || 1;

  const tattoos = await TattooService.getPaginated(searchparamsObj, skip, take);

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

export async function POST(request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      errorResponse: NextResponse.json(
        { error: "Not logged in" },
        { status: 401 },
      ),
    };
  }

  if (currentUser.role !== "ARTIST") {
    return {
      errorResponse: NextResponse.json(
        { error: "Not authorized" },
        { status: 401 },
      ),
    };
  }

  const artistProfile = await ArtistService.getById(
    currentUser.artistProfileId,
  );

  // I'm assuming here you'd want to throw an error if the profile wasn't found
  if (!artistProfile) {
    return {
      errorResponse: NextResponse.json(
        { error: "Profile not found" },
        { status: 404 },
      ),
    };
  }

  const body = await request.json();

  // non used property will be ignored
  const listing = await TattooService.create({
    ...body,
    artistProfile,
  });

  return NextResponse.json(listing);
}

// same as POST
export async function PUT(request) {
  const currentUser = await getCurrentUser();
  const artistProfile = await ArtistService.getById(
    currentUser.artistProfileId,
  );

  const body = await request.json();

  const currentTattoo = await TattooService.getById(body.tattooId, {
    includeTags: true,
  });

  const updatedTattoo = await TattooService.update(currentTattoo, {
    ...body,
    artistProfile,
  });

  return NextResponse.json(updatedTattoo);
}
