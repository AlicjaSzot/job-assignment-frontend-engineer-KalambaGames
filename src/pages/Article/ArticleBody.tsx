import ReactMarkdown from "react-markdown";
import { useArticle, useToggleFavorite } from "api/articles/useArticles";
import { useProfile, useToggleFollow } from "api/profile/useProfile";
import { useAuth } from "api/auth/useAuth";
import { DEFAULT_AVATAR } from "utils/constants";
import { formatDate } from "utils/formatDate";

interface Props {
  slug: string;
}

export default function ArticleBody({ slug }: Props): JSX.Element {
  const { article, isLoading, isError } = useArticle(slug);
  const { toggleFavorite, isLoading: favoriteLoading } = useToggleFavorite();
  const { profile } = useProfile(article?.author.username ?? "");
  const { toggleFollow, isLoading: followLoading } = useToggleFollow(article?.author.username ?? "");
  const { user } = useAuth();
  const isLoggedIn = !!user;

  if (isLoading || !article) return <></>;
  if (isError) return <p>Could not load article content.</p>;

  const { body, author, createdAt, favorited, favoritesCount } = article;
  const isFollowing = profile?.following ?? false;

  return (
    <>
      <div className="row article-content">
        <div className="col-md-12">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
      <hr />
      <div className="article-actions">
        <div className="article-meta">
          <a href={`/#/profile/${author.username}`}>
            <img src={author.image || DEFAULT_AVATAR} alt={author.username} />
          </a>
          <div className="info">
            <a href={`/#/profile/${author.username}`} className="author">
              {author.username}
            </a>
            <span className="date">{formatDate(createdAt)}</span>
          </div>
          {isLoggedIn && (
            <>
              <button
                className={`btn btn-sm ${isFollowing ? "btn-secondary" : "btn-outline-secondary"}`}
                onClick={(): void => toggleFollow(isFollowing)}
                disabled={followLoading}
              >
                <i className={`ion-${isFollowing ? "minus" : "plus"}-round`} />
                &nbsp;{isFollowing ? "Unfollow" : "Follow"} {author.username}
              </button>
              &nbsp;
            </>
          )}
          <button
            className={`btn btn-sm ${favorited ? "btn-primary" : "btn-outline-primary"}`}
            onClick={(): void => toggleFavorite({ slug, favorited })}
            disabled={favoriteLoading}
          >
            <i className="ion-heart" />
            &nbsp; Favorite Article <span className="counter">({favoritesCount})</span>
          </button>
        </div>
      </div>
    </>
  );
}
