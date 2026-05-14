import ArticlePreviewCard from "components/ArticlePreviewCard/ArticlePreviewCard";
import { useProfileArticles } from "api/profile/useProfile";

interface Props {
  username: string;
}

export default function ProfileArticleList({ username }: Props): JSX.Element {
  const { articlesData, isLoading } = useProfileArticles(username);

  if (isLoading) return <p>Loading articles...</p>;
  if ((articlesData?.articles?.length ?? 0) === 0) return <div className="article-preview">No articles yet.</div>;

  return (
    <>
      {articlesData?.articles?.map(article => (
        <ArticlePreviewCard
          key={article.slug}
          slug={article.slug}
          title={article.title}
          description={article.description}
          author={article.author}
          date={article.createdAt}
          favorited={article.favorited}
          favoritesCount={article.favoritesCount}
        />
      ))}
    </>
  );
}
