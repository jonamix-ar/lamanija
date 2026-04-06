// Base API Client para La Manija Official
type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

type PaginatedResponse<T> = {
  posts?: T[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number | null;
    to: number | null;
  };
};

class ApiClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor() {
    // Obtener la URL de la API, considerando diferentes entornos
    let apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
    
    // Si estamos en el servidor y no hay NEXT_PUBLIC_API_URL, usar localhost
    if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_API_URL) {
      apiUrl = "http://127.0.0.1:8000/api";
    }

    // Validar que la URL base sea válida
    try {
      const testUrl = new URL(apiUrl);
      this.baseURL = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
    } catch (error) {
      console.error("Invalid API URL:", apiUrl, error);
      this.baseURL = "http://127.0.0.1:8000/api";
    }

    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    // Validar que el endpoint no contenga valores undefined
    if (!endpoint || endpoint.includes("undefined")) {
      throw new Error(`Invalid endpoint: ${endpoint}`);
    }

    // Asegurar que el endpoint empiece con "/"
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // Limpiar endpoint de barras dobles
    const cleanEndpoint = normalizedEndpoint.replace(/\/+/g, "/");
    const url = `${this.baseURL}${cleanEndpoint}`;

    // Validar que la URL final sea válida
    try {
      new URL(url);
    } catch (urlError) {
      console.error('URL construction failed:', {
        baseURL: this.baseURL,
        cleanEndpoint,
        finalUrl: url,
        error: urlError
      });
      throw new Error(
        `Invalid URL constructed: ${url} from baseURL: ${this.baseURL} and endpoint: ${cleanEndpoint}`
      );
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Error [${cleanEndpoint}]:`, error);
      throw error;
    }
  }

  async get<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
export type { ApiResponse, PaginatedResponse };
