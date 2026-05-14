import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import { useToggleFavorite } from "./useArticles";
import * as articlesApi from "./articlesApi";
import { Article, MultipleArticlesResponse } from "../../types";

jest.mock("./articlesApi");

const mockFavoriteArticle = articlesApi.favoriteArticle as jest.MockedFunction<typeof articlesApi.favoriteArticle>;

const makeArticle = (overrides: Partial<Article> = {}): Article => ({
  slug: "test-article",
  title: "Test Article",
  description: "",
  body: "",
  tagList: [],
  createdAt: "2021-01-01T00:00:00.000Z",
  updatedAt: "2021-01-01T00:00:00.000Z",
  favorited: false,
  favoritesCount: 10,
  author: { username: "user", bio: "", image: "", following: false },
  ...overrides,
});

const makeArticlesResponse = (articles: Article[]): MultipleArticlesResponse => ({
  articles,
  articlesCount: articles.length,
});

function makeWrapper(client: QueryClient) {
  function Wrapper({ children }: { children: React.ReactNode }): JSX.Element {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  }
  return Wrapper;
}

function makeClient(): QueryClient {
  return new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
}

describe("useToggleFavorite", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("optimistically increments favoritesCount and sets favorited when favoriting", async () => {
    const article = makeArticle({ favorited: false, favoritesCount: 10 });
    const client = makeClient();
    const queryKey = ["articles", "global", {}];
    client.setQueryData(queryKey, makeArticlesResponse([article]));

    let resolveMutation!: (val: { article: Article }) => void;
    const deferred = new Promise<{ article: Article }>(res => {
      resolveMutation = res;
    });
    mockFavoriteArticle.mockReturnValue(deferred);

    const { result } = renderHook(() => useToggleFavorite(), {
      wrapper: makeWrapper(client),
    });

    await act(async () => {
      result.current.toggleFavorite({ slug: "test-article", favorited: false });
      await Promise.resolve();
    });

    const cached = client.getQueryData<MultipleArticlesResponse>(queryKey);
    const updated = cached?.articles.find(a => a.slug === "test-article");

    expect(updated?.favorited).toBe(true);
    expect(updated?.favoritesCount).toBe(11);

    resolveMutation({ article: { ...article, favorited: true, favoritesCount: 11 } });
  });

  it("rolls back cache to previous state when the API call fails", async () => {
    const article = makeArticle({ favorited: false, favoritesCount: 10 });
    const client = makeClient();
    const queryKey = ["articles", "global", {}];
    client.setQueryData(queryKey, makeArticlesResponse([article]));

    mockFavoriteArticle.mockRejectedValue(new Error("Network error"));

    const { result, waitFor } = renderHook(() => useToggleFavorite(), {
      wrapper: makeWrapper(client),
    });

    await act(async () => {
      result.current.toggleFavorite({ slug: "test-article", favorited: false });
    });

    await waitFor(() => !result.current.isLoading);

    const cached = client.getQueryData<MultipleArticlesResponse>(queryKey);
    const reverted = cached?.articles.find(a => a.slug === "test-article");

    expect(reverted?.favorited).toBe(false);
    expect(reverted?.favoritesCount).toBe(10);
  });
});
