// API para eventos
import { apiClient, type ApiResponse } from "./client";
import type { Event, EventTicket, EventsResponse } from "./types";

/**
 * Parámetros para la consulta de eventos
 */
export interface EventsQueryParams {
  upcoming?: boolean;
  featured?: boolean;
  section_id?: number;
  status?: string;
  per_page?: number;
  page?: number;
  limit?: number;
}

/**
 * Construye parámetros de consulta para las peticiones
 */
function buildQueryParams(params?: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) {
    return "";
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

/**
 * API de eventos con métodos para interactuar con el backend
 */
export const eventsApi = {
  /**
   * Obtener todos los eventos con filtros opcionales
   */
  async getAll(): Promise<EventsResponse> {
    try {
      const response = await apiClient.get<EventsResponse>(`/events`);
      console.log('API Client response:', response);
      
      // El cliente API devuelve ApiResponse<EventsResponse> con la estructura { success, data, message }
      // Pero Laravel devuelve directamente la estructura de paginación
      // Necesitamos manejar ambos casos
      if ('data' in response && response.data) {
        return response.data;
      } else {
        // Si el response ya es la estructura de EventsResponse directamente
        return response as unknown as EventsResponse;
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  /**
   * Obtener un evento por slug
   */
  async getBySlug(slug: string): Promise<Event> {
    if (!slug || slug.trim() === "") {
      throw new Error("Event slug is required");
    }

    try {
      const response = await apiClient.get(`/events/${encodeURIComponent(slug)}`);
      console.log('getBySlug response:', response);
      
      // Si la respuesta tiene la estructura de ApiResponse
      if (response && typeof response === 'object' && 'data' in response) {
        return (response as ApiResponse<Event>).data;
      }
      
      // Si la respuesta es directamente el evento (como devuelve Laravel)
      return response as Event;
    } catch (error) {
      console.error(`Error fetching event with slug ${slug}:`, error);
      throw error;
    }
  },

  /**
   * Obtener eventos próximos (usando endpoint específico)
   */
  async getUpcoming(limit?: number): Promise<Event[]> {
    try {
      const queryString = buildQueryParams(limit ? { limit } : undefined);
      const response: ApiResponse<Event[]> = await apiClient.get(
        `/events/upcoming${queryString}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      throw error;
    }
  },

  /**
   * Obtener eventos destacados
   */
  async getFeatured(limit?: number): Promise<Event[]> {
    try {
      const queryString = buildQueryParams(limit ? { limit } : undefined);
      const response: ApiResponse<Event[]> = await apiClient.get(
        `/events/featured${queryString}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching featured events:", error);
      throw error;
    }
  },

  /**
   * Obtener tickets de un evento
   */
  async getTickets(eventSlug: string): Promise<EventTicket[]> {
    if (!eventSlug || eventSlug.trim() === "") {
      throw new Error("Event slug is required");
    }

    try {
      const response: ApiResponse<EventTicket[]> = await apiClient.get(
        `/events/${encodeURIComponent(eventSlug)}/tickets`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching tickets for event ${eventSlug}:`, error);
      throw error;
    }
  },

  /**
   * Obtener todos los eventos (sin paginación, usando endpoint principal)
   */
  async getAllEvents(limit?: number): Promise<Event[]> {
    try {
      const params: EventsQueryParams = {};
      if (limit && limit > 0) {
        params.per_page = limit;
      }

      const response = await this.getAll();
      return response.data;
    } catch (error) {
      console.error("Error fetching all events:", error);
      throw error;
    }
  },
} as const;

// Funciones helper para usar directamente (compatibilidad hacia atrás)
export async function getEvents(): Promise<EventsResponse> {
  return eventsApi.getAll();
}

export async function getEvent(slug: string): Promise<Event> {
  return eventsApi.getBySlug(slug);
}

export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
  return eventsApi.getUpcoming(limit);
}

export async function getFeaturedEvents(limit?: number): Promise<Event[]> {
  return eventsApi.getFeatured(limit);
}

export async function getEventTickets(
  eventSlug: string
): Promise<EventTicket[]> {
  return eventsApi.getTickets(eventSlug);
}

/**
 * Nueva función helper para obtener todos los eventos sin paginación
 */
export async function getAllEvents(limit?: number): Promise<Event[]> {
  return eventsApi.getAllEvents(limit);
}
