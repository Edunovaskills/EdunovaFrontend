// src/app/api/event.api.ts (Updated)

// Define the interface for an individual event, based on your simplified schema
export interface IEvent {
  _id: string;
  title: string;
  description: string;
  price: number;
  paymentUrl: string;
  image?: string; // Optional image URL
  createdAt: string; // From timestamps
  updatedAt: string; // From timestamps
}

// Define the expected structure of the API response
interface EventsApiResponse {
  success: boolean;
  count: number;
  total: number;
  currentPage: number;
  totalPages: number;
  data: {
    events: IEvent[];
  };
}

/**
 * Fetches events from the backend API.
 * @param page The page number to fetch (default: 1).
 * @param limit The number of events per page (default: 10).
 * @param search A search query to filter events by title or description.
 * @returns A Promise that resolves to the EventsApiResponse.
 */
export const getEvents = async (
  page: number = 1,
  limit: number = 10,
  search: string = ''
): Promise<EventsApiResponse> => {
  try {
    // Construct query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());
    if (search) {
      queryParams.append('search', search);
    }

    // *** --- THIS IS THE CORRECTED LINE --- ***
    // Use the full absolute URL for your API endpoint
    const response = await fetch(`http://localhost:5000/api/user/events?${queryParams.toString()}`);

    if (!response.ok) {
      // Handle HTTP errors
      // Attempt to parse JSON error message, fallback if not JSON
      const errorText = await response.text(); // Read as text first
      let errorMessage = `Failed to fetch events: ${response.status} ${response.statusText}`;
      try {
        const errorData = JSON.parse(errorText); // Try parsing as JSON
        errorMessage = errorData.message || errorMessage;
      } catch (parseError) {
        // If not JSON, use the raw text or default message
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data: EventsApiResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching events:', error);
    // Ensure that the error caught is always an Error instance
    const finalError = error instanceof Error ? error : new Error('An unknown network error occurred');
    throw finalError; // Re-throw to be caught by the component
  }
};