import apiClient from "../apiClient";
import { ProfileResponse, Profile, MultipleArticlesResponse } from "../../types";
import { fetchGlobalArticles } from "../articles/articlesApi";
import { PROFILE_ARTICLES_LIMIT } from "../../utils/constants";

export const fetchProfile = async (username: string): Promise<ProfileResponse> => {
  const response = await apiClient.get<ProfileResponse>(`/profiles/${username}`);
  return response.data;
};

export const fetchProfileByUsername = async (username: string): Promise<Profile> => {
  const res = await fetchProfile(username);
  return res.profile;
};

export const followUser = async (username: string): Promise<ProfileResponse> => {
  const response = await apiClient.post<ProfileResponse>(`/profiles/${username}/follow`);
  return response.data;
};

export const unfollowUser = async (username: string): Promise<ProfileResponse> => {
  const response = await apiClient.delete<ProfileResponse>(`/profiles/${username}/follow`);
  return response.data;
};

export const toggleFollowUser = async (username: string, isFollowing: boolean): Promise<Profile> => {
  const res = isFollowing ? await unfollowUser(username) : await followUser(username);
  return res.profile;
};

export const fetchArticlesByAuthor = async (username: string): Promise<MultipleArticlesResponse> =>
  fetchGlobalArticles({ author: username, limit: PROFILE_ARTICLES_LIMIT, offset: 0 });
