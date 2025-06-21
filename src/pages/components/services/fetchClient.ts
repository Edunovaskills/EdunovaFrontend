// src/pages/components/services/fetchClient.ts

interface RequestOptions extends RequestInit {
  headers?: HeadersInit;
  body?: any; // Allows for JSON objects or FormData
}

// Ensure this matches your backend's base URL.
// It will be replaced by your .env.production value in production builds.
// Note: This needs to point to the base URL of your backend, e.g., 'http://localhost:5000'
// And the endpoint should then include the '/api' prefix if that's how your routes are defined.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'; // Adjusted to match typical backend setup

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
    credentials: 'include', // IMPORTANT: This line tells fetch to send cookies with the request
  };

  try {
    // Correctly concatenate API_BASE_URL and endpoint
    // Assuming endpoint already includes '/api' like '/api/admin/courses'
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (jsonError) {
        // If response is not JSON, use status text or a generic message
        errorData = { message: response.statusText || 'An unknown error occurred on the server.', status: response.status };
      }
      const errorMessage = errorData.message || `Request failed with status ${response.status}`;
      const error = new Error(errorMessage) as any; // Cast to 'any' to add custom properties
      error.status = response.status;
      error.data = errorData; // Attach full error data from backend if available
      throw error;
    }

    // Handle cases where response might be empty (e.g., 204 No Content for successful deletions)
    // or if the backend explicitly sends a success: true but no other data.
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return null as T; // Return null for no content
    }

    // Attempt to parse JSON. Your backend should consistently return JSON for non-204 responses.
    const text = await response.text();
    if (!text) {
      // This should ideally be caught by the content-length check above, but for robustness
      return null as T; // Empty response body
    }
    
    try {
      return JSON.parse(text); // Try parsing as JSON
    } catch (jsonParseError) {
      // If the response is not valid JSON, it indicates an unexpected backend response format.
      console.error('Failed to parse JSON response:', text, jsonParseError);
      throw new Error('Unexpected server response format. Expected JSON.');
    }

  } catch (networkError) {
    console.error('Network or fetch error:', networkError);
    throw new Error(`Network error: ${networkError instanceof Error ? networkError.message : String(networkError)}. Please check your internet connection and ensure the backend server is running.`);
  }
};
