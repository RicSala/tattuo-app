import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";


export async function getSession() {
    return await getServerSession(authOptions) // Auth handles the session for us in both the client and server
}


// using the session object, it gets the current user from the database, adding the artistProfileId and favoriteIds
// REVIEW: not sure if using the session here is the best approach
export async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
            include: {
                boards: true,
            },
        });

        if (!currentUser) {
            return null;
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(), // sanitizing the date
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified:
                currentUser.emailVerified?.toISOString() || null,
            artistProfileId: session.user.artistProfileId,
            favoriteIds: session.user.favoriteIds,
            savedIds: session.user.savedIds,
        };
    } catch (error) {
        return null;
    }
}
