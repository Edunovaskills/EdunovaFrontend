// src/features/components/admin/AddEvent/api/event.api.ts

import { fetchClient } from '../../../../../pages/components/services/fetchClient';
import { EventDTO, CreateEventDTO, FetchEventsResponseDTO } from '../model/event.dto';
import { mockEvents } from '../mock/mockEvents'; // Import your mock data

// --- API Implementation (Backend) ---
const fetchEventsFromBackend = async (
  limit: number,
  cursor: string | null
): Promise<FetchEventsResponseDTO> => {
  const queryParams = new URLSearchParams();
  queryParams.append('limit', String(limit));
  if (cursor) {
    queryParams.append('cursor', cursor);
  }

  try {
    const data = await fetchClient<FetchEventsResponseDTO>(`/events?${queryParams.toString()}`, {
      method: 'GET',
    });
    // Safeguard: Ensure data.events is always an array
    if (!Array.isArray(data.events)) {
      console.warn('Backend response for events was not an array. Defaulting to empty array.', data);
      data.events = [];
    }
    return data;
  } catch (error) {
    console.error('Error fetching events from backend:', error);
    throw new Error(`Failed to fetch events from backend: ${error instanceof Error ? error.message : String(error)}`);
  }
};

const createEventOnBackend = async (eventData: CreateEventDTO, image?: File | null): Promise<EventDTO> => {
  const formData = new FormData();
  // Append all properties from CreateEventDTO
  for (const key in eventData) {
    formData.append(key, String(eventData[key as keyof typeof eventData]));
  }
  if (image) {
    formData.append('image', image); // 'image' should match the field name expected by your backend
  }

  try {
    // fetchClient handles Content-Type for FormData automatically.
    const createdEvent = await fetchClient<EventDTO>('/events', {
      method: 'POST',
      body: formData,
    });
    return createdEvent;
  } catch (error) {
    console.error('Error creating event on backend:', error);
    throw new Error(`Failed to create event on backend: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// --- Mock Implementation (Fallback) ---
const fetchEventsFromMock = async (
  limit: number,
  cursor: string | null
): Promise<FetchEventsResponseDTO> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create a stable sorted copy of mockEvents for consistent pagination
      const sortedEvents = [...mockEvents].sort((a, b) => a.id.localeCompare(b.id));

      let startIndex = 0;
      if (cursor) {
        const cursorIndex = sortedEvents.findIndex((e) => e.id === cursor);
        if (cursorIndex !== -1) {
          startIndex = cursorIndex + 1; // Start from the item *after* the cursor
        } else {
          console.warn(`Mock API: Cursor '${cursor}' not found. Starting from beginning.`);
          startIndex = 0;
        }
      }

      const endIndex = startIndex + limit;
      const eventsSlice = sortedEvents.slice(startIndex, endIndex);

      const lastItemInSlice = eventsSlice[eventsSlice.length - 1];
      const nextCursor = (eventsSlice.length > 0 && endIndex < sortedEvents.length)
        ? lastItemInSlice.id
        : null;

      const hasMore = endIndex < sortedEvents.length;

      resolve({
        events: eventsSlice,
        nextCursor,
        hasMore,
      });
    }, 500); // Simulate network delay
  });
};

const createEventOnMock = async (eventData: CreateEventDTO, image?: File | null): Promise<EventDTO> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEvent: EventDTO = {
        ...eventData,
        id: `mock-event-${mockEvents.length + 1}-${Date.now()}`, // Generate a unique ID for mock
        // Simulate image URL if an image was provided
        imageUrl: image ? URL.createObjectURL(image) : undefined,
        createdAt: new Date().toISOString(),
      };
      mockEvents.push(newEvent); // Add to your mock data for demonstration
      console.log('Mock: Event created:', newEvent);
      resolve(newEvent);
    }, 500);
  });
};

// --- Conditional Export based on Environment ---
// Make sure you have this in your .env file: VITE_USE_MOCK_API=true or VITE_USE_MOCK_API=false
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

export const eventApi = {
  fetchEvents: USE_MOCK_API ? fetchEventsFromMock : fetchEventsFromBackend,
  createEvent: USE_MOCK_API ? createEventOnMock : createEventOnBackend,
};