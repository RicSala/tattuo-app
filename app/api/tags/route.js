import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import queryString from 'query-string';

export async function POST(req) {

    try {
        const body = await req.json();

        // check if the tag already exists
        const tag = await prisma.tag.findUnique({
            where: {
                label: body.label
            }
        })

        if (tag) {
            return NextResponse.json({ error: 'Tag already exists' }, { status: 400 })
        }

        const newTag = await prisma.tag.create({
            data: {
                label: body.label,
                value: body.label
            }
        })

        return NextResponse.json(newTag);

    } catch (error) {
        console.log(error, 'REGISTRATION_ERROR');
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}

export async function GET(request, something) {

    const parsedUrl = queryString.parseUrl(request.url)
    const { query } = parsedUrl;


    const { s = '' } = query;  // default s to an empty string if it is undefined

    // use prisma to find the first 10 cities in the database that start with the s query,
    //  regarless of case
    const tags = await prisma.tag.findMany({
        where: {
            label: {
                startsWith: s,
                mode: 'insensitive'
            }
        },
        take: 10
    });



    return NextResponse.json(tags, { status: 200 });

}
