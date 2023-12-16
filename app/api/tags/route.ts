import prisma from "@/lib/prismadb";
import { TagService } from "@/services/db/OthersService";
import { ApiResponse } from "@/types";
import { Prisma, PrismaClient, Tag, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import queryString from "query-string";

export async function POST(
    request: NextRequest,
): Promise<NextResponse<ApiResponse<User | Tag>>> {
    try {
        const body = await request.json();

        // check if the tag already exists
        const tag = await TagService.getByLabel(body.label);
        if (tag) {
            return NextResponse.json(
                { error: {}, statusCode: 400, data: null, ok: false },
                { status: 400 },
            );
        }

        const newTag = await TagService.create(body.label);

        return NextResponse.json(
            { data: newTag, statusCode: 200, ok: true },
            { status: 200 },
        );
    } catch (error) {
        console.log(error, "REGISTRATION_ERROR");
        return NextResponse.json(
            {
                error: { message: "Something went wrong" },
                statusCode: 500,
                data: null,
                ok: false,
            },
            { status: 500 },
        );
    }
}

export async function GET(request: NextRequest) {
    const parsedUrl = queryString.parseUrl(request.url);
    const { query } = parsedUrl;

    const { s = "" } = query; // default s to an empty string if it is undefined
    const tags = await TagService.getLabelsByQuery(s);

    return NextResponse.json({ tags }, { status: 200 });
}
