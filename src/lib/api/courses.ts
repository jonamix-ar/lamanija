import { apiClient } from "./client";
import type { Course } from "./types";

export const coursesApi = {
  /**
   * Obtener todos los cursos
   */
  async getAll(): Promise<Course[]> {
    const response = await apiClient.get<Course[]>("/courses");
    return response.data;
  },

  /**
   * Obtener un curso por ID
   */
  async getById(id: number): Promise<Course> {
    const response = await apiClient.get<Course>(`/courses/${id}`);
    return response.data;
  },
};
