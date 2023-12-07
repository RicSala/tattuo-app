//@ts-check

import { apiClient } from "./apiClient";

/** @param {string} query */
export const getArtistsProfiles = async (query) => {
  const res = await apiClient.get(`/artists?artisticName=${query}`);
  /** @type {Promise<import("@prisma/client").ArtistProfile[]>}*/
  const tatuadores = res.data.data;
  return tatuadores;
};

/**
 * @param {string} query
 */
export const getUnclaimedArtistsProfiles = async (query) => {
  const res = await apiClient.get(
    `/artists?artisticName=${query}&unclaimed=true`,
  );
  /**
   * @type {Promise<import("@prisma/client").ArtistProfile[]>} ArtistsPromise}
   */
  const tatuadores = res.data.data;
  return tatuadores;
};

/**
 * @param {string} query
 */
export const getUnclaimedStudioProfiles = async (query) => {
  const res = await apiClient.get(`/studios?name=${query}&unclaimed=true`);
  /**
   * @type {Promise<import("@prisma/client").Studio[]>} StudiosPromise}
   */
  const studios = res.data.data;
  return studios;
};
