import { Posts } from './posts.model';

export class PaginatedPosts {
    current_page: number;
    data: Posts[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: number;
    links: [];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
  }