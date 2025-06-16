// src/pages/components/services/fetchClient.ts

interface RequestOptions extends RequestInit {
  headers?: HeadersInit;
  body?: any; // Allows for JSON objects or FormData
}

// Ensure this matches your backend's base URL.
// It will be replaced by your .env.production value in production builds.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const fetchClient = async <T>(
  endpoint: string,
  options?: RequestOptions
): Promise<T> => {
  const isFormData = options?.body instanceof FormData;

  const headers: HeadersInit = isFormData
    ? {
        // When sending FormData, DO NOT set 'Content-Type: multipart/form-data'.
        // The browser will set it correctly with the boundary automatically.
      }
    : {
        'Content-Type': 'application/json',
      };

  const config: RequestInit = {
    ...options,
    headers: {
      ...headers,
      ...options?.headers, // Allow overriding/adding headers
    },
    body: isFormData ? options.body : (options?.body ? JSON.stringify(options.body) : undefined),
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (jsonError) {
        // If response is not JSON, use status text
        errorData = { message: response.statusText || 'An unknown error occurred', status: response.status };
      }
      const errorMessage = errorData.message || `Request failed with status ${response.status}`;
      const error = new Error(errorMessage) as any; // Cast to 'any' to add custom properties
      error.status = response.status;
      error.data = errorData; // Attach full error data from backend if available
      throw error;
    }

    // Handle cases where response might be empty (e.g., 204 No Content for successful deletions)
    if (response.status === 204) {
      return null as T; // Return null for no content
    }

    // Attempt to parse JSON, but handle cases where response might not be JSON (e.g., HTML, plain text)
    const text = await response.text();
    if (!text) {
      return null as T; // Empty response body
    }
    try {
      return JSON.parse(text); // Try parsing as JSON
    } catch (jsonParseError) {
      // If it's not JSON, return it as plain text or throw error based on expectation
      console.warn('Response was not valid JSON:', text);
      return text as T; // Or throw new Error('Invalid JSON response');
    }

  } catch (networkError) {
    console.error('Network or fetch error:', networkError);
    throw new Error(`Network error: ${networkError instanceof Error ? networkError.message : String(networkError)}. Please check your connection.`);
  }
};