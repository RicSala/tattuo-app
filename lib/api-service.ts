//@ts-check

import { WithProperty, inviteFormBody } from "@/types";
import { apiClient } from "./apiClient";
import { Studio, ArtistProfile, City } from "@prisma/client";
import { StudioUpdateResponse } from "@/app/api/studios/route";

// /** @param {string} query */
export const getArtistsProfiles = async (query: string) => {
  const res = await apiClient.get(`/artists?artisticName=${query}`);
  //   /** @type {Promise<import("@prisma/client").ArtistProfile[]>}*/

  const tatuadores: ArtistProfile[] = res.data.data;
  return tatuadores;
};

export const exitStudio = async (studioId: string, userId: string) => {
  const res = await apiClient.post(`/studies`, {
    action: "EXIT",
    data: {
      studioId,
      userId,
    },
  });
  return res.data;
};

// /**
//  * @param {string} query
//  */
export const getUnclaimedArtistsProfiles = async (query: string) => {
  const res = await apiClient.get(
    `/artists?artisticName=${query}&unclaimed=true`,
  );
  //   /**
  //    * @type {Promise<import("@prisma/client").ArtistProfile[]>} ArtistsPromise}
  //    */
  const tatuadores: ArtistProfile[] = res.data.data;
  return tatuadores;
};

export const getUnclaimedStudioProfiles = async (query: string) => {
  const res = await apiClient.get(`/studios?name=${query}&unclaimed=true`);

  const studios = res.data.data as Studio[];
  return studios;
};

export const sendInvitate = async ({ studioId, invites }: inviteFormBody) => {
  console.log("from api service", studioId, invites);
  const res = await apiClient.post(`/studios`, {
    action: "INVITE",
    data: {
      studioId: studioId,
      invites: invites,
    },
  });
  return res.data;
};

export const acceptInvite = async (inviteId: string) => {
  const res = await apiClient.post(`/studios`, {
    action: "ACCEPT_INVITE",
    data: {
      inviteId,
    },
  });
  return res.data;
};
export const rejectInvite = async (inviteId: string) => {
  const res = await apiClient.post(`/studios`, {
    action: "REJECT_INVITE",
    data: {
      inviteId,
    },
  });
  return res.data;
};

export const updateOrCreateStudio = async (
  data: WithProperty<Studio, "city", City>,
) => {
  const res = await apiClient.post("/studios", {
    action: data.id === "new" ? "CREATE" : "UPDATE",
    data,
  });

  const resData: StudioUpdateResponse = res.data;
  return resData;
};
