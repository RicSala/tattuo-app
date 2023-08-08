import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";


export async function DELETE(request, { params }) {


    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({ error: 'Not logged in' }, { status: 401 })
    }

    if (currentUser.role !== 'ARTIST') {
        return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
    }

    const { tattooId } = params

    if (!tattooId || typeof tattooId !== 'string') {
        throw new Error('Invalid ID')
    }

    // delete the tattoo
    const deletedTattoo = await prisma.tattoo.delete({
        where: {
            id: tattooId
        }
    })

    return NextResponse.json(deletedTattoo)

}
