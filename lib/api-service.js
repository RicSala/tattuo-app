import { apiClient } from "./apiClient";

export const getArtistsProfiles = async (query) => {
  const res = await apiClient.get(`/artists?artisticName=${query}`);
  const tatuadores = res.data.data;
  return tatuadores;
};

export const getUnclaimedArtistsProfiles = async (query) => {
  const res = await apiClient.get(
    `/artists?artisticName=${query}&unclaimed=true`,
  );
  const tatuadores = res.data.data;
  return tatuadores;
};

export const getUnclaimedStudioProfiles = async (query) => {
  const res = await apiClient.get(`/studios?name=${query}&unclaimed=true`);
  const studios = res.data.data;
  return studios;
};
