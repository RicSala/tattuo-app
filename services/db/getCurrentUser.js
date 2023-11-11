import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";

export async function getSession() {
  return await getServerSession(authOptions); // Auth handles the session for us in both the client and server
}

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
        settings: true,
        // include the tattos of the artist too
        artist: {
          include: {
            tattoos: true,
          },
        },
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(), // sanitizing the date
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
      artistProfileId: session.user.artistProfileId,
      favoriteIds: session.user.favoriteIds,
      savedIds: session.user.savedIds,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
