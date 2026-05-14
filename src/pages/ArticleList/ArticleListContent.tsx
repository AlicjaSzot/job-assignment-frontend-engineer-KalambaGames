import { useCallback } from "react";
import ArticlePreviewCard from "components/ArticlePreviewCard/ArticlePreviewCard";
import { useArticles, useToggleFavorite } from "api/articles/useArticles";
import { Article } from "types";
import { UseMutateFunction } from "react-query";
import { SingleArticleResponse } from "types";

interface Props {
  activeTab: string;
}

interface ArticleListItemProps {
  article: Article;
  toggleFavorite: UseMutateFunction<SingleArticleResponse, Error, { slug: string; favorited: boolean }>;
}

function ArticleListItem({ article, toggleFavorite }: ArticleListItemProps): JSX.Element {
  const onFavorite = useCallback((): void => {
    toggleFavorite({ slug: article.slug, favorited: article.favorited });
  }, [article.slug, article.favorited, toggleFavorite]);

  return (
    <ArticlePreviewCard
      slug={article.slug}
      title={article.title}
      description={article.description}
      author={article.author}
      date={article.createdAt}
      favorited={article.favorited}
      favoritesCount={article.favoritesCount}
      onFavorite={onFavorite}
    />
  );
}

export default function ArticleListContent({ activeTab }: Props): JSX.Element {
  const { articlesData, isLoading, isError } = useArticles(activeTab);
  const { toggleFavorite } = useToggleFavorite();

  if (isLoading) return <div className="article-preview">Loading articles...</div>;
  if (isError) return <div className="article-preview">An error occurred while loading articles.</div>;

  return (
    <>
      {articlesData?.articles?.map((article: Article) => (
        <ArticleListItem key={article.slug} article={article} toggleFavorite={toggleFavorite} />
      ))}
    </>
  );
}
