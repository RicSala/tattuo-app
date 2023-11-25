import { apiClient } from "./apiClient";

export const getArtistsProfiles = async (query) => {
  const res = await apiClient.get(`/artists?artisticName=${query}`);
  /** @typedef {import("@prisma/client").ArtistProfile} ArtistProfile*/
  /** @type {ArtistProfile[]} */
  const tatuadores = res.data.data;
  return tatuadores;
};

export const getUnclaimedArtistsProfiles = async (query) => {
  const res = await apiClient.get(
    `/artists?artisticName=${query}&unclaimed=true`,
  );
  const tatuadores = res.data.data;
  //   .data;
  return tatuadores;
};
