import { apiClient } from "./client";
import type {
  Post,
  PostsQuery,
  PostsResponse,
  RelatedPostsResponse,
} from "./types";

export const postsApi = {
  /**
   * Obtener todos los posts con filtros y paginación
   */
  async getAll(query?: PostsQuery): Promise<PostsResponse> {
    const params = new URLSearchParams();

    if (query?.section_id)
      params.append("section_id", query.section_id.toString());
    if (query?.category_id)
      params.append("category_id", query.category_id.toString());
    if (query?.author_id)
      params.append("author_id", query.author_id.toString());
    if (query?.per_page) params.append("per_page", query.per_page.toString());
    if (query?.page) params.append("page", query.page.toString());

    const queryString = params.toString();
    const endpoint = `/posts${queryString ? `?${queryString}` : ""}`;

    try {
      const response = await apiClient.get(endpoint);
      console.log('getAll posts response:', response);
      
      // Si la respuesta tiene la estructura de ApiResponse
      if (response && typeof response === 'object' && 'data' in response) {
        return (response as any).data;
      }
      
      // Si la respuesta es directamente la estructura de posts
      return response as PostsResponse;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  /**
   * Obtener un post por slug
   */
  async getBySlug(slug: string): Promise<Post> {
    if (!slug || slug.trim() === "") {
      throw new Error("Post slug is required");
    }

    try {
      const response = await apiClient.get(`/posts/${encodeURIComponent(slug)}`);
      console.log('getBySlug response:', response);
      
      // Si la respuesta tiene la estructura de ApiResponse
      if (response && typeof response === 'object' && 'data' in response) {
        return (response as any).data;
      }
      
      // Si la respuesta es directamente el post (como devuelve Laravel)
      return response as Post;
    } catch (error) {
      console.error(`Error fetching post with slug ${slug}:`, error);
      throw error;
    }
  },

  /**
   * Obtener posts relacionados
   */
  async getRelated(
    slug: string,
    limit?: number
  ): Promise<RelatedPostsResponse> {
    const params = new URLSearchParams();
    if (limit) params.append("limit", limit.toString());

    const queryString = params.toString();
    const endpoint = `/posts/${slug}/related${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await apiClient.get<RelatedPostsResponse>(endpoint);
    return response.data;
  },

  /**
   * Obtener un post por slug (ruta alternativa)
   */
  async getBySlugAlt(slug: string): Promise<Post> {
    const response = await apiClient.get<Post>(`/post/${slug}`);
    return response.data;
  },
};
