import prisma from "@/lib/prismadb";
import { TagService } from "@/services/db/OthersService";
import { NextResponse } from "next/server";
import queryString from "query-string";

export async function POST(req) {
  try {
    const body = await req.json();

    // check if the tag already exists
    const tag = await TagService.getByLabel(body.label);
    if (tag) {
      return NextResponse.json(
        { error: "Tag already exists" },
        { status: 400 },
      );
    }

    const newTag = await TagService.create(body.label);

    return NextResponse.json(newTag);
  } catch (error) {
    console.log(error, "REGISTRATION_ERROR");
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function GET(request, something) {
  const parsedUrl = queryString.parseUrl(request.url);
  const { query } = parsedUrl;

  const { s = "" } = query; // default s to an empty string if it is undefined
  const tags = await TagService.getLabelsByQuery(s);

  return NextResponse.json(tags, { status: 200 });
}
