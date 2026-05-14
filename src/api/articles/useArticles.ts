import { useQuery, useMutation, useQueryClient, UseMutateFunction, QueryKey } from "react-query";
import {
  fetchGlobalArticles,
  fetchFeedArticles,
  fetchArticle,
  favoriteArticle,
  unfavoriteArticle,
} from "./articlesApi";
import { MultipleArticlesResponse, SingleArticleResponse, Article, ArticlesParams } from "../../types";

interface UseArticlesResult {
  articlesData: MultipleArticlesResponse | undefined;
  isLoading: boolean;
  isError: boolean;
}

interface UseArticleResult {
  article: Article | undefined;
  isLoading: boolean;
  isError: boolean;
}

interface UseToggleFavoriteResult {
  toggleFavorite: UseMutateFunction<SingleArticleResponse, Error, { slug: string; favorited: boolean }>;
  isLoading: boolean;
}

export function useArticles(tab: string, params: ArticlesParams = {}): UseArticlesResult {
  const {
    data: articlesData,
    isLoading,
    isError,
  } = useQuery<MultipleArticlesResponse, Error>(
    ["articles", tab, params],
    (): Promise<MultipleArticlesResponse> =>
      tab === "your-feed" ? fetchFeedArticles(params) : fetchGlobalArticles(params)
  );

  return { articlesData, isLoading, isError };
}

export function useArticle(slug: string): UseArticleResult {
  const { data, isLoading, isError } = useQuery<SingleArticleResponse, Error>(
    ["article", slug],
    (): Promise<SingleArticleResponse> => fetchArticle(slug)
  );

  return { article: data?.article, isLoading, isError };
}

export function useToggleFavorite(): UseToggleFavoriteResult {
  const queryClient = useQueryClient();

  const { mutate: toggleFavorite, isLoading } = useMutation<
    SingleArticleResponse,
    Error,
    { slug: string; favorited: boolean },
    { previousData: MultipleArticlesResponse | undefined; queryKey: QueryKey } | undefined
  >(
    ({ slug, favorited }): Promise<SingleArticleResponse> =>
      favorited ? unfavoriteArticle(slug) : favoriteArticle(slug),
    {
      onMutate: async ({ slug, favorited }) => {
        const queries = queryClient.getQueriesData<MultipleArticlesResponse>("articles");
        const match = queries.find(([, data]) => data?.articles?.some(a => a.slug === slug));

        if (!match) return undefined;

        const [queryKey, previousData] = match;

        await queryClient.cancelQueries(queryKey);
        await queryClient.cancelQueries(["article", slug]);

        queryClient.setQueryData<MultipleArticlesResponse>(queryKey, old => {
          if (!old) return { articles: [], articlesCount: 0 };
          return {
            ...old,
            articles: old.articles.map(article =>
              article.slug === slug
                ? {
                    ...article,
                    favorited: !favorited,
                    favoritesCount: favorited ? article.favoritesCount - 1 : article.favoritesCount + 1,
                  }
                : article
            ),
          };
        });

        queryClient.setQueryData<SingleArticleResponse | undefined>(["article", slug], old => {
          if (!old) return undefined;
          return {
            article: {
              ...old.article,
              favorited: !favorited,
              favoritesCount: favorited ? old.article.favoritesCount - 1 : old.article.favoritesCount + 1,
            },
          };
        });

        return { previousData, queryKey };
      },
      onError: (_err, _vars, context) => {
        if (context) {
          queryClient.setQueryData(context.queryKey, context.previousData);
        }
      },
      onSettled: (_data, _err, { slug }) => {
        queryClient.invalidateQueries("articles");
        queryClient.invalidateQueries(["article", slug]);
      },
    }
  );

  return { toggleFavorite, isLoading };
}
