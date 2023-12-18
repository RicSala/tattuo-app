//@ts-check

import { ApiRequestBody, WithProperty, inviteFormBody } from "@/types";
import { apiClient } from "../../lib/apiClient";
import { Studio, ArtistProfile, City, Tag } from "@prisma/client";
import {
    StudioApiRequestBody,
    StudioApiResponse,
    StudioUpdateResponse,
} from "@/app/api/studios/route";
import { StudioFormValues } from "@/app/(site)/studio/claim/[studioId]/useStudioForm";
import { ArtistApiRequestBody } from "@/app/api/superadmin/artists/route";
import { TattooApiRequestBody } from "@/app/api/superadmin/tattoos/route";
import { TattooForm } from "@/app/(site)/artist/tatuajes/[tattooId]/TattooEditPageClient";
import {
    TattooPublicApiRequestBody,
    TattooPublicApiResponse,
} from "@/app/api/tattoos/route";

export class ApiService {
    static async getArtistsProfiles(query: string) {
        const res = await apiClient.get(`/artists?artisticName=${query}`);
        //   /** @type {Promise<import("@prisma/client").ArtistProfile[]>}*/

        const tatuadores: ArtistProfile[] = res.data.data;
        return tatuadores;
    }

    static async exitStudio(studioId: string, artistId: string) {
        const body: StudioApiRequestBody<"EXIT"> = {
            action: "EXIT",
            data: {
                studioId,
                artistId,
            },
        };
        const res = await apiClient.post(`/studios`, body);
        const resData: StudioApiResponse<"EXIT"> = res.data;
        return resData;
    }

    static async getUnclaimedArtistsProfiles(query: string) {
        const res = await apiClient.get(
            `/artists?artisticName=${query}&unclaimed=true`,
        );
        //   /**
        //    * @type {Promise<import("@prisma/client").ArtistProfile[]>} ArtistsPromise}
        //    */
        const tatuadores: ArtistProfile[] = res.data.data;
        return tatuadores;
    }

    static async getUnclaimedStudioProfiles(query: string) {
        const res = await apiClient.get(
            `/studios?name=${query}&unclaimed=true`,
        );

        const studios = res.data.data as Studio[];
        return studios;
    }

    static async sendInvite({ studioId, invites }: inviteFormBody) {
        console.log("from api service", studioId, invites);
        const body: StudioApiRequestBody<"INVITE"> = {
            action: "INVITE",
            data: {
                studioId,
                invites,
            },
        };
        const res = await apiClient.post(`/studios`, body);

        const resData: StudioApiResponse<"INVITE"> = res.data;
        return resData;
    }

    static async acceptInvite(inviteId: string) {
        const body: StudioApiRequestBody<"ACCEPT_INVITE"> = {
            action: "ACCEPT_INVITE",
            data: {
                inviteId,
            },
        };
        const res = await apiClient.post(`/studios`, body);

        const resData: StudioApiResponse<"ACCEPT_INVITE"> = res.data;

        return resData;
    }
    static async rejectInvite(inviteId: string) {
        const body: StudioApiRequestBody<"REJECT_INVITE"> = {
            action: "REJECT_INVITE",
            data: {
                inviteId,
            },
        };
        const res = await apiClient.post(`/studios`, body);

        const resData: StudioApiResponse<"REJECT_INVITE"> = res.data;

        return resData;
    }

    static async updateOrCreateStudio(data: StudioFormValues) {
        const body:
            | StudioApiRequestBody<"CREATE">
            | StudioApiRequestBody<"UPDATE"> = {
            action: data.id === "new" ? "CREATE" : "UPDATE",
            data,
        };

        const res = await apiClient.post("/studios", body);

        const resData:
            | StudioApiResponse<"CREATE">
            | StudioApiResponse<"CREATE"> = res.data;
        return resData;
    }

    static async filterTags(inputValue: string) {
        const res = await apiClient.get(`/tags?s=${inputValue}`);
        const tags: Tag[] = res.data.tags;
        return tags;
    }

    static async createTag(inputValue: string) {
        // send a post request to our api to create a new tag
        const res = await apiClient.post(`/tags/`, { label: inputValue });
        const newTag: Tag = res.data.data;
        return newTag;
    }

    static async processTattoo(data: any) {
        const res = await apiClient.post(`/superadmin/tattoo-processing`, {
            action: "PROCESS",
            data,
        });
        return res.data;
    }

    static async deleteArtist(artistId: string) {
        const body: ArtistApiRequestBody<"DELETE"> = {
            action: "DELETE",
            data: {
                artistId,
            },
        };
        const res = await apiClient.post(`/superadmin/artists`, body);
        return res.data;
    }

    static async deleteStudioById(studioId: string) {
        const body: StudioApiRequestBody<"DELETE"> = {
            action: "DELETE",
            data: {
                studioId,
            },
        };
        const res = await apiClient.post(`/studios`, body);
        return res.data;
    }

    static async deleteTattooById(tattooId: string) {
        const body: TattooApiRequestBody<"DELETE"> = {
            action: "DELETE",
            data: {
                tattooId,
            },
        };

        const res = await apiClient.post(`/superadmin/tattoos`, body);

        return res.data;
    }

    static async createTattoo(data: TattooForm) {
        const body: TattooPublicApiRequestBody<"CREATE"> = {
            action: "CREATE",
            data,
        };
        const res = await apiClient.post(`/tattoos`, body);

        const resData: TattooPublicApiResponse<"CREATE"> = res.data;
        return resData;
    }

    static async updateTattoo(data: TattooForm) {
        const body: TattooPublicApiRequestBody<"UPDATE"> = {
            action: "UPDATE",
            data,
        };
        const res = await apiClient.post(`/tattoos`, body);

        const resData: TattooPublicApiResponse<"UPDATE"> = res.data;
        return resData;
    }
}
