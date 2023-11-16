import { apiClient } from "./apiClient";

/**
 * Given a query, gets 10 artists whose name contains the query
 * @param {string} query
 * @returns {Promise<Artist[]>}
 */
export const getArtistsProfiles = async (query) => {
  const res = await apiClient.get(`/artists?artisticName=${query}`);
  const tatuadores = res.data.data;
  //   .data;
  return tatuadores;
};

/**
 * Given a query, gets 10 UNCLAIMED artist profiles whose name contains the query
 * @param {string} query
 * @returns {Promise<Artist[]>}
 */
export const getUnclaimedArtistsProfiles = async (query) => {
  const res = await apiClient.get(
    `/artists?artisticName=${query}&unclaimed=true`,
  );
  const tatuadores = res.data.data;
  //   .data;
  return tatuadores;
};
