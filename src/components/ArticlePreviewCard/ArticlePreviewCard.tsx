import React, { memo } from "react";
import { Profile } from "types";
import { DEFAULT_AVATAR } from "utils/constants";
import { formatDate } from "utils/formatDate";

interface ArticlePreviewCardProps {
  slug: string;
  title: string;
  description: string;
  author: Profile;
  date: string;
  favorited: boolean;
  favoritesCount: number;
  onFavorite?: () => void;
}

function ArticlePreviewCard({
  slug,
  title,
  description,
  author,
  date,
  favorited,
  favoritesCount,
  onFavorite,
}: ArticlePreviewCardProps): JSX.Element {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href={`/#/profile/${author.username}`}>
          <img src={author.image || DEFAULT_AVATAR} alt={author.username} />
        </a>
        <div className="info">
          <a href={`/#/profile/${author.username}`} className="author">
            {author.username}
          </a>
          <span className="date">{formatDate(date)}</span>
        </div>
        <button
          className={`btn btn-sm pull-xs-right ${favorited ? "btn-primary" : "btn-outline-primary"}`}
          onClick={onFavorite}
        >
          <i className="ion-heart" /> {favoritesCount}
        </button>
      </div>
      <a href={`/#/article/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </a>
    </div>
  );
}

export default memo(ArticlePreviewCard);
