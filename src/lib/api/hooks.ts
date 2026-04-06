// React Query Hooks para La Manija Official
// Opcional: instalar @tanstack/react-query para usar estos hooks

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { sectionsApi, postsApi, coursesApi, eventsApi, djProfilesApi, settingsApi } from "./index";
import type { SiteSettings } from "./settings";
import type {
  Section,
  Post,
  Course,
  Event,
  EventTicket,
  EventsResponse,
  PostsQuery,
  PostsResponse,
  RelatedPostsResponse,
  SectionPostsQuery,
  SectionPostsResponse,
  DJProfile,
  Track,
} from "./types";

// Sections Hooks
export const useSections = (): UseQueryResult<Section[]> => {
  return useQuery({
    queryKey: ["sections"],
    queryFn: () => sectionsApi.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useSection = (slug: string): UseQueryResult<Section> => {
  return useQuery({
    queryKey: ["sections", slug],
    queryFn: () => sectionsApi.getBySlug(slug),
    enabled: !!slug && slug !== "undefined" && slug.trim() !== "",
    staleTime: 5 * 60 * 1000,
  });
};

export const useSectionPosts = (
  slug: string,
  query?: SectionPostsQuery
): UseQueryResult<SectionPostsResponse> => {
  const isValidSlug = !!slug && slug !== "undefined" && slug.trim() !== "";

  return useQuery({
    queryKey: ["sections", slug, "posts", query],
    queryFn: () => sectionsApi.getPosts(slug, query),
    enabled: isValidSlug,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
};

// Posts Hooks
export const usePosts = (query?: PostsQuery): UseQueryResult<PostsResponse> => {
  return useQuery({
    queryKey: ["posts", query],
    queryFn: () => postsApi.getAll(query),
    staleTime: 2 * 60 * 1000,
  });
};

export const usePost = (slug: string): UseQueryResult<Post> => {
  return useQuery({
    queryKey: ["posts", slug],
    queryFn: () => postsApi.getBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useRelatedPosts = (
  slug: string,
  limit?: number
): UseQueryResult<RelatedPostsResponse> => {
  return useQuery({
    queryKey: ["posts", slug, "related", limit],
    queryFn: () => postsApi.getRelated(slug, limit),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

// Courses Hooks
export const useCourses = (): UseQueryResult<Course[]> => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => coursesApi.getAll(),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
};

export const useCourse = (id: number): UseQueryResult<Course> => {
  return useQuery({
    queryKey: ["courses", id],
    queryFn: () => coursesApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

// Events Hooks
export const useEvents = (params?: {
  upcoming?: boolean;
  featured?: boolean;
  section_id?: number;
  status?: string;
  per_page?: number;
  page?: number;
}): UseQueryResult<EventsResponse> => {
  return useQuery({
    queryKey: ["events", params],
    queryFn: () => eventsApi.getAll(), // Sin parámetros
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useEvent = (slug: string): UseQueryResult<Event> => {
  return useQuery({
    queryKey: ["events", slug],
    queryFn: () => eventsApi.getBySlug(slug),
    enabled: !!slug && slug !== "undefined" && slug.trim() !== "",
    staleTime: 5 * 60 * 1000,
  });
};

export const useAllEvents = (limit?: number): UseQueryResult<Event[]> => {
  return useQuery({
    queryKey: ["events", "all", limit],
    queryFn: async () => {
      console.log("Fetching ALL events ordered by created_at...");
      const response = await eventsApi.getAll();
      console.log("eventsApi response:", response);

      // La respuesta del cliente API es directamente la estructura de Laravel
      // que ya tiene la propiedad 'data' con los eventos
      let events: Event[] = [];
      
      if (Array.isArray(response)) {
        // Si la respuesta es directamente un array
        events = response;
      } else if (response && typeof response === 'object' && 'data' in response) {
        // Si la respuesta es un objeto con propiedad 'data'
        events = response.data || [];
      }
      
      console.log('Events extracted:', events);

      // Ordenar por created_at descendente (más recientes primero)
      const sortedEvents = events.sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });

      console.log("Sorted events by created_at:", sortedEvents);
      return sortedEvents;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpcomingEvents = (limit?: number): UseQueryResult<Event[]> => {
  return useQuery({
    queryKey: ["events", "upcoming", limit],
    queryFn: () => eventsApi.getUpcoming(limit),
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedEvents = (limit?: number): UseQueryResult<Event[]> => {
  return useQuery({
    queryKey: ["events", "featured", limit],
    queryFn: () => eventsApi.getFeatured(limit),
    staleTime: 10 * 60 * 1000,
  });
};

export const useEventTickets = (
  eventSlug: string
): UseQueryResult<EventTicket[]> => {
  return useQuery({
    queryKey: ["events", eventSlug, "tickets"],
    queryFn: () => eventsApi.getTickets(eventSlug),
    enabled:
      !!eventSlug && eventSlug !== "undefined" && eventSlug.trim() !== "",
    staleTime: 2 * 60 * 1000, // 2 minutos (tickets se actualizan más frecuentemente)
  });
};

// DJ Profiles Hooks
export const useDJProfiles = (): UseQueryResult<DJProfile[]> => {
  return useQuery({
    queryKey: ["dj-profiles"],
    queryFn: async () => {
      const response = await djProfilesApi.getAll();
      if (response && typeof response === "object" && "data" in response) {
        return response.data || [];
      }
      return Array.isArray(response) ? response : [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useDJProfile = (slug: string): UseQueryResult<DJProfile> => {
  return useQuery({
    queryKey: ["dj-profiles", slug],
    queryFn: () => djProfilesApi.getBySlug(slug),
    enabled: !!slug && slug !== "undefined" && slug.trim() !== "",
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedDJs = (limit?: number): UseQueryResult<DJProfile[]> => {
  return useQuery({
    queryKey: ["dj-profiles", "featured", limit],
    queryFn: () => djProfilesApi.getFeatured(limit),
    staleTime: 5 * 60 * 1000,
  });
};

export const useDJTracks = (slug: string): UseQueryResult<Track[]> => {
  return useQuery({
    queryKey: ["dj-profiles", slug, "tracks"],
    queryFn: () => djProfilesApi.getTracks(slug),
    enabled: !!slug && slug !== "undefined" && slug.trim() !== "",
    staleTime: 5 * 60 * 1000,
  });
};

// Settings Hook
export const useSettings = (): UseQueryResult<SiteSettings> => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: () => settingsApi.getAll(),
    staleTime: 10 * 60 * 1000, // 10 minutos - settings cambian poco
  });
};
