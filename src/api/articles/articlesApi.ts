import apiClient from "../apiClient";
import { ArticlesParams, MultipleArticlesResponse, SingleArticleResponse } from "../../types";
import { DEFAULT_ARTICLES_LIMIT } from "../../utils/constants";

export const fetchGlobalArticles = async (params: ArticlesParams = {}): Promise<MultipleArticlesResponse> => {
  const response = await apiClient.get<MultipleArticlesResponse>("/articles", {
    params: { limit: DEFAULT_ARTICLES_LIMIT, offset: 0, ...params },
  });
  return response.data;
};

export const fetchFeedArticles = async (
  params: Pick<ArticlesParams, "limit" | "offset"> = {}
): Promise<MultipleArticlesResponse> => {
  const response = await apiClient.get<MultipleArticlesResponse>("/articles/feed", {
    params: { limit: DEFAULT_ARTICLES_LIMIT, offset: 0, ...params },
  });
  return response.data;
};

export const fetchArticle = async (slug: string): Promise<SingleArticleResponse> => {
  const response = await apiClient.get<SingleArticleResponse>(`/articles/${slug}`);
  return response.data;
};

export const favoriteArticle = async (slug: string): Promise<SingleArticleResponse> => {
  const response = await apiClient.post<SingleArticleResponse>(`/articles/${slug}/favorite`);
  return response.data;
};

export const unfavoriteArticle = async (slug: string): Promise<SingleArticleResponse> => {
  const response = await apiClient.delete<SingleArticleResponse>(`/articles/${slug}/favorite`);
  return response.data;
};
