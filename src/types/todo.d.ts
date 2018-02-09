export interface SearchQuery {
  keywords: string;
  tags: string[];
}

export interface TodoToPost {
  name: string;
  tagIds: number[];
  categoryId: number;
  expiresAt: any;
  completed: false;
}