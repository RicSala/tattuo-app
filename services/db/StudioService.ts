import { StudioFormValues } from "@/app/(site)/studio/claim/[studioId]/useStudioForm";
import { StudioApiResponse } from "@/app/api/studios/route";
import { invitationMail } from "@/config/const";
import { mapLabelsToIds } from "@/lib/getStyleList";
import { sendEmail } from "@/lib/mailgun";
import prisma from "@/lib/prismadb";
import { slugify } from "@/lib/utils";
import {
    ExitFormBody,
    WithProperty,
    inviteFormBody,
    searchParams,
} from "@/types";
import { City, Prisma, Studio } from "@prisma/client";

export class StudioService {
    static async getPaginated(
        searchParams: searchParams,
        skip = 0,
        take: number | undefined = undefined,
        include = {},
    ) {
        const query = this.#buildQuery(searchParams);
        const studios = await prisma.studio.findMany({
            where: query,
            orderBy: [{ createdAt: "asc" }, { id: "asc" }],
            include,
            skip,
            take,
        });
        return studios;
    }

    static async update(
        studioData: StudioFormValues,
    ): Promise<StudioApiResponse<"UPDATE">["data"]> {
        // REVIEW: This is another easy way to omit properties from an object
        const { id, userId, ...data } = studioData;
        const studio = await prisma.studio.update({
            where: { id },
            data: {
                ...data,
                user: userId ? { connect: { id: userId } } : undefined,
                city: { connect: { id: data.city.id } },
            },
        });
        return studio;
    }

    static async create(studioData: StudioFormValues) {
        // delete the id from the data
        delete studioData.id;
        const cityId = studioData.city.id;

        const { userId, ...formattedData } = studioData;

        const studio = await prisma.studio.create({
            data: {
                ...formattedData,
                name: formattedData.name,
                slug: slugify(studioData.name),
                googlePlaceUrl: `RANDOM - ${Number(new Date())}}`,
                user: userId ? { connect: { id: userId } } : undefined,
                city: { connect: { id: cityId } },
            },
        });
        return studio;
    }

    static async getUserStudios(userId: string) {
        const studios = await prisma.studio.findMany({
            where: { userId },
        });
        return studios;
    }

    static async delete(
        id: string,
    ): Promise<StudioApiResponse<"DELETE">["data"]> {
        const studio = await prisma.studio.delete({
            where: { id },
        });
        return studio;
    }

    static async getArtistInvites(artistId: string) {
        const artist = await prisma.artistProfile.findUnique({
            where: { id: artistId },
            include: {
                Invites: {
                    include: {
                        studio: true,
                    },
                },
            },
        });
        return artist.Invites;
    }

    static async getArtistStudios(artistId: string) {
        const artist = await prisma.artistProfile.findUnique({
            where: { id: artistId },
            include: {
                studios: true,
            },
        });
        return artist.studios;
    }

    static async acceptInvite(
        inviteId: string,
    ): Promise<StudioApiResponse<"ACCEPT_INVITE">["data"]> {
        // update the invite document (invite is a join collection between artist and studio)
        const invite = await prisma.invite.update({
            where: {
                id: inviteId,
            },
            data: {
                status: "ACCEPTED",
            },
        });

        // update the studio document to add the artist
        const studio = await prisma.studio.update({
            where: { id: invite.studioId },
            data: {
                artists: {
                    connect: {
                        id: invite.artistId,
                    },
                },
            },
        });
        return invite;
    }

    static async exitStudio(
        studioId: string,
        artistId: string,
    ): Promise<StudioApiResponse<"EXIT">["data"]> | never {
        // update the studio document to remove the artist
        try {
            const studio = await prisma.studio.update({
                where: { id: studioId },
                data: {
                    artists: {
                        disconnect: {
                            id: artistId,
                        },
                    },
                },
            });
            return studio;
        } catch (error) {
            console.log(error);
            throw new Error("Error exiting studio");
        }
    }

    static async rejectInvite(
        inviteId: string,
    ): Promise<StudioApiResponse<"REJECT_INVITE">["data"]> {
        // update the invite document (invite is a join collection between artist and studio)
        const invite = await prisma.invite.update({
            where: {
                id: inviteId,
            },
            data: {
                status: "REJECTED",
            },
        });

        // We don't need to update anything else, the invite is just rejected
        return invite;
    }

    static async invite({
        studioId,
        invites,
    }: inviteFormBody): Promise<StudioApiResponse<"INVITE">["data"]> {
        for (let i = 0; i < invites.length; i++) {
            // If artist.id = "email", next iteration
            const invite = invites[i];
            const id = invite.id;
            //   If the id is email, is a non-registered artist that we have to invite via email
            if (id === "email") {
                await sendEmail(
                    invite.label,
                    "TATTUO - Has sido invitado a unirte a un estudio",
                    "Te han invitado a TATTUO",
                    invitationMail(),
                    "ricardo@tattuo.com",
                );
                continue;
            }
            await prisma.invite.upsert({
                // data: {
                //   artistId: artist.id,
                //   studioId,
                // },
                where: {
                    studioId_artistId: {
                        artistId: invite.id,
                        studioId,
                    },
                },
                update: {},
                create: {
                    artistId: invite.id,
                    studioId,
                },
            });
        }
        return;
    }

    static #buildQuery(searchParams: searchParams) {
        const { name, styles, city, freeSearch, unclaimed } = searchParams;

        //TODO: check this out!
        /**
         * @type {import('.prisma/client').Prisma.StudioWhereInput}
         */

        let query: Prisma.StudioWhereInput = {};

        const stylesArray = styles?.split(",").map((style) => style.trim());

        // REVIEW: Studio does not have its own styles, it has artists that have styles
        // if (stylesArray && stylesArray.length > 0) {
        //   const styleIds = mapLabelsToIds(stylesArray);
        //   query.stylesIds = {
        //     hasSome: styleIds,
        //   };
        // }

        if (name) {
            query.name = {
                contains: name,
                mode: "insensitive",
            };
        }

        if (city) {
            query.city = {
                label: {
                    equals: city,
                    mode: "insensitive",
                },
            };
        }

        // create a query that returns the tattoos that match the search in the title or description
        if (freeSearch) {
            query = {
                ...query,
                OR: [
                    {
                        name: {
                            contains: freeSearch,
                            mode: "insensitive",
                        },
                    },
                    {
                        description: {
                            contains: freeSearch,
                            mode: "insensitive",
                        },
                    },
                ],
            };
        }

        // if isClaimed is exists and is equal to false, only return those that has isClaimed false
        if (unclaimed) {
            query = {
                ...query,
                // and it has not user
                user: null,
            };
        }

        return query;
    }
}
