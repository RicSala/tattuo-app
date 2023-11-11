import { NextResponse } from "next/server";
import { getCurrentUser } from "@/services/db/getCurrentUser";
import prisma from "@/lib/prismadb";
import axios from "axios";
import cloudinary from "cloudinary";

export async function DELETE(request, { params }) {
  const currentUser = await getCurrentUser(request);

  const { imageId } = params;

  if (!currentUser) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  if (currentUser.role !== "ARTIST") {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const config = {
    api: {
      bodyParser: false,
    },
  };

  cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Delete an image

  cloudinary.v2.uploader
    .destroy(`tatuajes/${imageId}`)
    .then((result) => {
      console.log(result);
      return NextResponse.json({
        message: "Image deleted",
        status: 200,
      });
    })
    .catch((error) => {
      console.log(error);
      return NextResponse.json({
        message: "Error deleting image",
        status: 500,
      });
    });

  return NextResponse.json({
    message: "Error deleting image",
    status: 500,
  });
}
