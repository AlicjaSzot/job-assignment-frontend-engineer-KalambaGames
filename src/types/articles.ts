export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface Author {
  username: string;
  image: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
}

export interface MultipleArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface SingleArticleResponse {
  article: Article;
}
