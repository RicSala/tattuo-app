import { NextResponse } from "next/server";
import { seedDb } from "@/libs/seedDb";
import queryString from "query-string";
import prisma from "@/lib/prismadb";

export async function GET(request, something) {

    const parsedUrl = queryString.parseUrl(request.url)
    const { query } = parsedUrl;


    const { s = '' } = query;  // default s to an empty string if it is undefined

    // use prisma to find the first 10 cities in the database that start with the s query,
    //  regarless of case
    const cities = await prisma.city.findMany({
        where: {
            label: {
                startsWith: s,
                mode: 'insensitive'
            }
        },
        take: 10
    });


    return NextResponse.json(cities, { status: 200 });
}