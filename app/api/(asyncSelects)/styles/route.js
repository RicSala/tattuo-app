import { NextResponse } from "next/server";
import queryString from "query-string";
import prisma from "@/lib/prismadb";
import { StyleService } from "@/services/db/StyleService";

export async function GET(request) {
  const parsedUrl = queryString.parseUrl(request.url);
  const { query } = parsedUrl;

  const { s = "" } = query;

  const cities = await StyleService.getStylesByQueryPaginated({ s, take: 10 });

  return NextResponse.json(cities, { status: 200 });
}
