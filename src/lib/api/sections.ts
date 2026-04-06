import { apiClient } from "./client";
import type { Section, SectionPostsQuery, SectionPostsResponse } from "./types";

export const sectionsApi = {
  /**
   * Obtener todas las secciones
   */
  async getAll(): Promise<Section[]> {
    const response = await apiClient.get<Section[]>("/sections");
    return response.data;
  },

  /**
   * Obtener una sección por slug
   */
  async getBySlug(slug: string): Promise<Section> {
    if (!slug || slug === "undefined" || slug.trim() === "") {
      throw new Error("Slug is required and cannot be empty");
    }

    const response = await apiClient.get<Section>(
      `/sections/${encodeURIComponent(slug)}`
    );
    return response.data;
  },

  /**
   * Obtener posts de una sección específica
   */
  async getPosts(
    slug: string,
    query?: SectionPostsQuery
  ): Promise<SectionPostsResponse> {
    if (!slug || slug === "undefined" || slug.trim() === "") {
      throw new Error("Slug is required and cannot be empty");
    }

    const params = new URLSearchParams();

    if (query?.per_page) params.append("per_page", query.per_page.toString());
    if (query?.page) params.append("page", query.page.toString());

    const queryString = params.toString();
    const endpoint = `/sections/${encodeURIComponent(slug)}/posts${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await apiClient.get<SectionPostsResponse>(endpoint);
    return response.data;
  },

  /**
   * Obtener una sección por slug (ruta alternativa)
   */
  async getBySlugAlt(slug: string): Promise<Section> {
    const response = await apiClient.get<Section>(`/section/${slug}`);
    return response.data;
  },
};
