
export interface UserNode {
  id?: string;
  username?: string;
}

export interface CategoryNode {
  id?: string;
  title?: string;
  description?: string;
  articles?: ArticleNode[];
  slug?: string;
}

export interface MenuNode {
  id?: string;
  name?: string;
  items?: {
    slug: string;
    title: string;
  }[];
}

export interface ArticleNode {
  id?: string;
  title?: string;
  published?: boolean;
  slug?: string;
  image?: any;
  content?: string;
  createdAt?: any;
  category?: CategoryNode;
  user?: UserNode;
}

export interface ArticleEdge {
  node: ArticleNode;
}

export interface CategoryEdge {
  node: CategoryNode;
}

export type ArticleEdges = ArticleEdge[];
export type CategoryEdges = CategoryEdge[];

export interface ArticleQuery {
  data: {
    strapiArticle: ArticleNode;
  };
}

export interface CategoryQuery {
  data: {
    strapiCategory: CategoryNode;
  };
}

export interface ArticlesQuery {
  data: {
    allStrapiArticle: {
      edges: ArticleEdges;
    };
  };
}

export interface SIteMetedataQuery {
  site: {
    siteMetadata: {
      title?: string;
      description?: string;
      siteUrl?: string;
      coverImage?: string;
      logo?: string;
      facebook?: string;
      twitter?: string;
      showSubscribe?: string;
    };
  };
}

export interface MenuQuery {
  strapiMenu: MenuNode;
}

export type SiteNavQuery = SIteMetedataQuery & MenuQuery;
