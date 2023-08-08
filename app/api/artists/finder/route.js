import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function POST(request, { params }) {

    const currentUser = await getCurrentUser(request);

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json();

    const profileMatches = await getMatches(currentUser, body);

    return NextResponse.json(profileMatches)
}

const getMatches = async (currentUser, body) => {

    const { styles, address } = body;

    try {
        const city = await prisma.city.findFirst({
            where: {
                label: {
                    equals: address,
                    mode: "insensitive", // this will make the search case-insensitive
                },
            },
        })

        if (!city) {
            console.log(`No city found with label: ${address}`);
            return;
        }

        const matchedArtists = await prisma.artistProfile.findMany({
            where: {
                cityId: city.id,
            },
            include: {
                styles: true,
                city: true,
            }
        });

        console.log('Matched Artists:', matchedArtists);
        return matchedArtists;
    } catch (error) {
        console.error('Error querying artists:', error);
    }
}