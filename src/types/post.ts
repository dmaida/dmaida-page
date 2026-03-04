export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  slug: string;
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
}

export interface PostMeta {
  frontmatter: PostFrontmatter;
}
