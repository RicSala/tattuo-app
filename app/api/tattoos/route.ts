import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/services/db/getCurrentUser";
import prisma from "@/lib/prismadb";
import { ArtistService } from "@/services/db/ArtistService";
import { TattooService } from "@/services/db/TattooService";
import {
  TTattooWDTagsWStylesWBodyPartWArtistProfile,
  WithProperty,
} from "@/types";
import { TTattooUpdateForm } from "@/app/(site)/artist/tatuajes/[tattooId]/TattooEditPageClient";
import { ArtistProfile, Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  const url = new URL(req.nextUrl); // Create a URL object

  const searchparamsObj = Object.fromEntries(url.searchParams);

  const originalTake = parseInt(searchparamsObj.pageSize) || 10;
  const take = originalTake + 1; // we add one to the take to know if there are more pages
  const skip =
    (Number.parseInt(searchparamsObj.page) - 1) *
    Number.parseInt(searchparamsObj.pageSize);

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
    return NextResponse.error();
  }
}

export async function POST(request: NextRequest) {
  console.log("Got request to create a tattoo...");

  const currentUser = await getCurrentUser();

  console.log("currentUser: ", currentUser);

  if (!currentUser) {
    return NextResponse.json(
      { error: { message: "No autorizado" }, statusCode: 400 },
      { status: 400 },
    );
  }

  if (currentUser.role !== "ARTIST" && currentUser.role !== "ADMIN") {
    console.log("currentUser.role: ", currentUser.role);
    return NextResponse.json(
      { error: { message: "No autorizado" }, statusCode: 400 },
      { status: 400 },
    );
  }

  let artistProfile;

  if (currentUser.role === "ARTIST") {
    artistProfile = await ArtistService.getById(currentUser.artistProfileId);

    // I'm assuming here you'd want to throw an error if the profile wasn't found
    if (!artistProfile) {
      return {
        errorResponse: NextResponse.json(
          { error: "Profile not found" },
          { status: 404 },
        ),
      };
    }
  }

  const body: WithProperty<TTattooUpdateForm, "artistProfile", ArtistProfile> =
    await request.json();

  console.log("body: ", body);

  // non used property will be ignored
  //   TODO: temporary disabled
  const listing = await TattooService.create({
    ...body,
    artistProfile,
  });

  //   const listing = await createNewTattoo(body);

  return NextResponse.json(listing);
}

// same as POST
export async function PUT(request: NextRequest) {
  const currentUser = await getCurrentUser();
  const artistProfile = await ArtistService.getById(
    currentUser.artistProfileId,
  );

  const body: WithProperty<TTattooUpdateForm, "artistProfile", ArtistProfile> =
    await request.json();

  const currentTattoo: TTattooWDTagsWStylesWBodyPartWArtistProfile =
    await TattooService.getById(body.tattooId, {
      includeTags: true,
      includeBodyPart: true,
    });

  body.artistProfile = artistProfile;

  const updatedTattoo = {
    ...body,
    artistProfile,
  };

  const updatedDBTattoo = await TattooService.update(
    currentTattoo,
    updatedTattoo,
  );

  return NextResponse.json(updatedDBTattoo);
}

// TODO: This should be done in TattooService, in the same create method, but is throwing an error consistently so I am gonna isolate it here for now

const createNewTattoo = async (
  body: WithProperty<TTattooUpdateForm, "artistProfile", ArtistProfile>,
) => {
  const {
    title,
    description,
    imageSrc,
    styles,
    bodyPart,
    artistProfile,
    tags,
  } = body;

  //   search the body part with the id
  const bodyPartId = bodyPart.id;
  const bodyPartFromDB = await prisma.bodyPart.findUnique({
    where: { id: bodyPartId },
  });
  console.log("bodyPartFromDB: ", bodyPartFromDB);

  let data: Prisma.TattooCreateInput = {
    title,
    description,
    imageSrc,
    styles: {
      connect: styles.map((style) => ({ id: style.id })),
    },
    bodyPart: {
      connect: { id: bodyPart.id },
    },

    // artistProfile: artistProfile
    //   ? {
    //       connect: { id: artistProfile.id },
    //     }
    //   : null,
    tags: {
      create: tags.map((tag) => ({
        tag: { connect: { id: tag.id } },
      })),
    },
  };

  if (artistProfile) {
    data.artistProfile = { connect: { id: artistProfile.id } };
  }

  const listing = await prisma.tattoo.create({
    data,
  });

  console.log("data:::> ", data);
  console.log("listing:::> ", listing);

  return listing;
};
