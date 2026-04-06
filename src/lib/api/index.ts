// API Library para La Manija Official

// Cliente base
export { apiClient } from "./client";
export type { ApiResponse, PaginatedResponse } from "./client";

// Tipos
export type {
  Author,
  Category,
  Section,
  Post,
  Course,
  Event,
  EventTicket,
  EventsResponse,
  PostsQuery,
  SectionPostsQuery,
  PostsResponse,
  RelatedPostsResponse,
  SectionPostsResponse,
} from "./types";

// Servicios
export { sectionsApi } from "./sections";
export { postsApi } from "./posts";
export { coursesApi } from "./courses";
export { eventsApi } from "./events";
export { djProfilesApi } from "./dj-profiles";
export { settingsApi } from "./settings";
export type { SiteSettings } from "./settings";

// Re-export todo para fácil importación
export * from "./sections";
export * from "./posts";
export * from "./courses";
export * from "./events";
export * from "./dj-profiles";
export * from "./types";
export * from "./client";
