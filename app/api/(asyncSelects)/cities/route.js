import { NextResponse } from "next/server";
import queryString from "query-string";
import prisma from "@/lib/prismadb";
import { CityService } from "@/services/db/CityService";

export async function GET(request) {
  //TODO: I am pretty sure we dont neeed searchparams with nextjs

  const parsedUrl = queryString.parseUrl(request.url);
  const { query } = parsedUrl;

  const { s = "" } = query; // default s to an empty string if it is undefined
  const cities = await CityService.getCitiesByQueryPaginated({
    query: s,
    take: 10,
  });

  return NextResponse.json(cities, { status: 200 });
}
