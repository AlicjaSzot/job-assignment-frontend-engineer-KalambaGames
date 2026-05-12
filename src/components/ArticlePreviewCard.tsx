import React from "react";

interface Author {
  username: string;
  image: string;
}

interface ArticlePreviewCardProps {
  slug: string;
  title: string;
  description: string;
  author: Author;
  date: string;
  favorited: boolean;
  favoritesCount: number;
  onFavorite?: () => void;
}

export default function ArticlePreviewCard({
  slug,
  title,
  description,
  author,
  date,
  favorited,
  favoritesCount,
  onFavorite,
}: ArticlePreviewCardProps) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href={`/#/profile/${author.username}`}>
          <img src={author.image} alt={author.username} />
        </a>
        <div className="info">
          <a href={`/#/profile/${author.username}`} className="author">
            {author.username}
          </a>
          <span className="date">{new Date(date).toDateString()}</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right" onClick={onFavorite}>
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
