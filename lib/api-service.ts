//@ts-check

import { inviteFormData } from "@/types";
import { apiClient } from "./apiClient";
import { Studio } from "@prisma/client";

/** @param {string} query */
export const getArtistsProfiles = async (query: string) => {
  const res = await apiClient.get(`/artists?artisticName=${query}`);
  /** @type {Promise<import("@prisma/client").ArtistProfile[]>}*/
  const tatuadores = res.data.data;
  return tatuadores;
};

/**
 * @param {string} query
 */
export const getUnclaimedArtistsProfiles = async (query: string) => {
  const res = await apiClient.get(
    `/artists?artisticName=${query}&unclaimed=true`,
  );
  /**
   * @type {Promise<import("@prisma/client").ArtistProfile[]>} ArtistsPromise}
   */
  const tatuadores = res.data.data;
  return tatuadores;
};

// /**
//  * @param {string} query
//  * @return {Promise<import("@prisma/client").Studio[]>}
//  */
export const getUnclaimedStudioProfiles = async (query: string) => {
  const res = await apiClient.get(`/studios?name=${query}&unclaimed=true`);
  /**
   * @type {Promise<import("@prisma/client").Studio[]>} StudiosPromise}
   */
  const studios = res.data.data as Studio[];
  return studios;
};

export const sendInvitations = async ({
  studioId,
  invites,
}: inviteFormData) => {
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
