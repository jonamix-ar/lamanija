import { apiClient } from "./client";
import type { DJProfile, Track } from "./types";

export const djProfilesApi = {
  async getAll(): Promise<any> {
    const response = await apiClient.get('/dj-profiles');
    if (response && typeof response === 'object' && 'data' in response) {
      return response;
    }
    return response;
  },

  async getBySlug(slug: string): Promise<DJProfile> {
    const response = await apiClient.get(`/dj-profiles/${encodeURIComponent(slug)}`);
    return response as unknown as DJProfile;
  },

  async getFeatured(limit?: number): Promise<DJProfile[]> {
    const params = limit ? `?limit=${limit}` : '';
    const response = await apiClient.get(`/dj-profiles/featured${params}`);
    return response as unknown as DJProfile[];
  },

  async getTracks(slug: string): Promise<Track[]> {
    const response = await apiClient.get(`/dj-profiles/${encodeURIComponent(slug)}/tracks`);
    return response as unknown as Track[];
  },
};
