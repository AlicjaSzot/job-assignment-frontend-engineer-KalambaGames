interface ArticleMetaProps {
  author: string;
  authorImage: string;
  date: string;
  followersCount?: number;
  favoritesCount?: number;
  showFollowButton?: boolean;
  showFavoriteButton?: boolean;
  onFollow?: () => void;
  onFavorite?: () => void;
}

export default function ArticleMeta({
  author,
  authorImage,
  date,
  followersCount,
  favoritesCount,
  showFollowButton = true,
  showFavoriteButton = true,
  onFollow,
  onFavorite,
}: ArticleMetaProps) {
  return (
    <div className="article-meta">
      <a href={`/#/profile/${author}`}>
        <img src={authorImage} alt={author} />
      </a>
      <div className="info">
        <a href={`/#/profile/${author}`} className="author">
          {author}
        </a>
        <span className="date">{date}</span>
      </div>
      {showFollowButton && (
        <button className="btn btn-sm btn-outline-secondary" onClick={onFollow}>
          <i className="ion-plus-round" />
          &nbsp; Follow {author} {followersCount !== undefined && <span className="counter">({followersCount})</span>}
        </button>
      )}
      &nbsp;&nbsp;
      {showFavoriteButton && (
        <button className="btn btn-sm btn-outline-primary" onClick={onFavorite}>
          <i className="ion-heart" />
          &nbsp; Favorite Post {favoritesCount !== undefined && <span className="counter">({favoritesCount})</span>}
        </button>
      )}
    </div>
  );
}
