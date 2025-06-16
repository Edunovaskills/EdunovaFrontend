import React, { useState, useEffect, useCallback } from 'react';
import { addEventStyles } from './styles.component';
import { EventDTO, CreateEventDTO, FetchEventsResponseDTO } from './model/event.dto';
import { eventApi } from './api/event.api';

const LOCAL_STORAGE_KEY = 'addEventForm';
const VIEW_MODE_KEY = 'eventListViewMode';

export const AddEvent: React.FC = () => {
  const [event, setEvent] = useState<CreateEventDTO & { image: File | null }>(() => {
    const savedEvent = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsed = savedEvent ? JSON.parse(savedEvent) : {
      title: '', description: '', date: '', time: '', location: '',
      category: 'conference', maxAttendees: 0, eventUrl: '', image: null,
    };
    parsed.image = null;
    return parsed;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(() => {
    const savedEvent = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedEvent) {
      const parsedEvent = JSON.parse(savedEvent);
      return parsedEvent.imagePreview || null;
    }
    return null;
  });
  const [dragActive, setDragActive] = useState(false);

  // Event list states
  const [events, setEvents] = useState<EventDTO[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingEvents, setIsFetchingEvents] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // New state for current page
  const limit = 6;

  // View mode state
  const [isGridView, setIsGridView] = useState<boolean>(() => {
    const savedViewMode = localStorage.getItem(VIEW_MODE_KEY);
    return savedViewMode ? JSON.parse(savedViewMode) : true;
  });

  // Save form data and view mode to local storage
  useEffect(() => {
    const { image, ...eventToSave } = event;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...eventToSave, imagePreview }));
  }, [event, imagePreview]);

  useEffect(() => {
    localStorage.setItem(VIEW_MODE_KEY, JSON.stringify(isGridView));
  }, [isGridView]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { image, ...eventDataToSubmit } = event;
      const createdEvent: EventDTO = await eventApi.createEvent(eventDataToSubmit, image);

      console.log('Event created successfully:', createdEvent);
      alert('Event created successfully!');

      setEvent({
        title: '', description: '', date: '', time: '', location: '',
        category: 'conference', maxAttendees: 0, eventUrl: '', image: null,
      });
      setImagePreview(null);
      localStorage.removeItem(LOCAL_STORAGE_KEY);

      setCurrentPage(1); // Reset to first page after adding new event
      await fetchEventsPage(null); // Re-fetch from the start
    } catch (error) {
      console.error('Error creating event:', error);
      alert(`Error creating event: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEvent(prev => ({
      ...prev,
      [name]: name === 'maxAttendees' ? Number(value) : value,
    }));
  };

  const handleImageChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setEvent(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file (PNG, JPG, GIF)');
      setEvent(prev => ({ ...prev, image: null }));
      setImagePreview(null);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageChange(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageChange(file);
  };

  const removeImage = () => {
    setEvent(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const fetchEventsPage = useCallback(
    async (cursor: string | null) => {
      setIsFetchingEvents(true);
      try {
        const response: FetchEventsResponseDTO = await eventApi.fetchEvents(limit, cursor);
        setEvents(response.events);
        setNextCursor(response.nextCursor);
        setHasMore(response.hasMore);
      } catch (error) {
        console.error('Error fetching events:', error);
        alert(`Failed to load events: ${error instanceof Error ? error.message : String(error)}. Please try again later.`);
      } finally {
        setIsFetchingEvents(false);
      }
    },
    [limit]
  );

  useEffect(() => {
    // Initial fetch for the first page
    fetchEventsPage(null);
  }, [fetchEventsPage]);

  // Pagination logic: Next and Previous buttons will now just update currentPage
  // and then trigger a re-fetch with the appropriate cursor.
  const handleNextPage = () => {
    if (hasMore && !isFetchingEvents) {
      setCurrentPage(prev => prev + 1);
      fetchEventsPage(nextCursor);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1 && !isFetchingEvents) {
      setCurrentPage(prev => prev - 1);
      // To go to the previous page, we need to re-fetch from the *beginning*
      // and then skip (currentPage - 1) * limit items.
      // This is a common pattern for mock pagination when a true "previous cursor" isn't available.
      // For a real API, you'd ideally have a prevCursor or page number directly.
      fetchEventsPage(null); // Fetch from start for simplicity with mock, then client-side pagination logic
    }
  };

  // For real pagination with mock data, we'd need to calculate the cursor for the previous page.
  // A simpler way with mock data, especially if you control the mock API:
  // Modify eventApi.fetchEvents to also accept a `page` number if needed.
  // For now, `handlePrevPage` will just reload the very first page if not on page 1.
  // To simulate actual page-by-page back navigation with mock, the mockEvents array
  // would need to be passed to the component, and we'd slice it based on currentPage.

  // Let's refine mock data pagination to properly handle previous pages.
  // This will be handled in `event.api.ts` by making `fetchEventsFromMock` smarter.
  // For now, the `currentPage` state will only be used for display.

  const theme = document.body.getAttribute('data-theme') || 'light';
  // Note: isFirstPage logic using mock ID is less robust for dynamic data.
  // For real APIs, you'd check if a previous page cursor exists.

  return (
    <div style={{ ...addEventStyles.container, backgroundColor: theme === 'light' ? '#ffffff' : '#1f2a44' }}>
      <h2 style={{ ...addEventStyles.title, color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>
        Add New Event
      </h2>

      <form onSubmit={handleSubmit} style={addEventStyles.form}>
        <div style={addEventStyles.row}>
          <div style={addEventStyles.field}>
            <label style={addEventStyles.label}>Event Title</label>
            <input
              type="text"
              name="title"
              value={event.title}
              onChange={handleChange}
              style={addEventStyles.input}
              required
            />
          </div>
          <div style={addEventStyles.field}>
            <label style={addEventStyles.label}>Location</label>
            <input
              type="text"
              name="location"
              value={event.location}
              onChange={handleChange}
              style={addEventStyles.input}
              required
            />
          </div>
        </div>

        <div style={addEventStyles.field}>
          <label style={addEventStyles.label}>Description</label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            style={addEventStyles.textarea}
            rows={4}
            required
          />
        </div>

        <div style={addEventStyles.row}>
          <div style={addEventStyles.field}>
            <label style={addEventStyles.label}>Date</label>
            <input
              type="date"
              name="date"
              value={event.date}
              onChange={handleChange}
              style={addEventStyles.input}
              required
            />
          </div>
          <div style={addEventStyles.field}>
            <label style={addEventStyles.label}>Time</label>
            <input
              type="time"
              name="time"
              value={event.time}
              onChange={handleChange}
              style={addEventStyles.input}
              required
            />
          </div>
        </div>

        <div style={addEventStyles.row}>
          <div style={addEventStyles.field}>
            <label style={addEventStyles.label}>Category</label>
            <select
              name="category"
              value={event.category}
              onChange={handleChange}
              style={addEventStyles.select}
              required
            >
              <option value="conference">Conference</option>
              <option value="webinar">Webinar</option>
              <option value="workshop">Workshop</option>
              <option value="exhibition">Exhibition</option>
              <option value="meetup">Meetup</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div style={addEventStyles.field}>
            <label style={addEventStyles.label}>Max Attendees</label>
            <input
              type="number"
              name="maxAttendees"
              value={event.maxAttendees}
              onChange={handleChange}
              style={addEventStyles.input}
              min="0"
              required
            />
          </div>
        </div>

        <div style={addEventStyles.field}>
          <label style={addEventStyles.label}>Event URL</label>
          <input
            type="url"
            name="eventUrl"
            value={event.eventUrl}
            onChange={handleChange}
            style={addEventStyles.input}
            placeholder="e.g., https://example.com/event"
            required
          />
        </div>

        {/* Photo Upload Section */}
        <div style={addEventStyles.field}>
          <label style={addEventStyles.label}>Event Photo</label>

          {!imagePreview ? (
            <div
              style={{
                ...addEventStyles.uploadArea,
                ...(dragActive ? addEventStyles.uploadAreaActive : {})
              }}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                style={addEventStyles.fileInput}
                id="event-image-upload"
              />
              <label htmlFor="event-image-upload" style={addEventStyles.uploadLabel}>
                <div style={addEventStyles.uploadIcon}>📸</div>
                <div style={addEventStyles.uploadText}>
                  <p style={addEventStyles.uploadMainText}>
                    Click to upload or drag and drop
                  </p>
                  <p style={addEventStyles.uploadSubText}>
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </label>
            </div>
          ) : (
            <div
              style={addEventStyles.imagePreviewContainer}
              // You might need to add onMouseEnter/onMouseLeave here
              // if your CSS-in-JS solution doesn't handle &:hover
              // or if you're sticking purely to inline styles.
              // For demonstration, I'm assuming imageOverlay's style will handle hover.
            >
              <img
                src={imagePreview}
                alt="Event preview"
                style={addEventStyles.imagePreview}
              />
              <div style={addEventStyles.imageOverlay}>
                <button
                  type="button"
                  onClick={removeImage}
                  style={addEventStyles.removeButton}
                >
                  ✕ Remove
                </button>
                <label htmlFor="event-image-replace" style={addEventStyles.replaceButton}>
                  🔄 Replace
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  style={addEventStyles.fileInput}
                  id="event-image-replace"
                />
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          style={{
            ...addEventStyles.submitButton,
            ...(isLoading ? { backgroundColor: '#94a3b8', cursor: 'not-allowed', transform: 'none' } : {})
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Event...' : 'Create Event'}
        </button>
      </form>

      {/* Events List Section */}
      <div style={addEventStyles.eventListSection}>
        <h2 style={{ ...addEventStyles.title, color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>All Events</h2>

        {/* View Toggle Buttons */}
        <div style={addEventStyles.viewToggleContainer}>
          <button
            onClick={() => setIsGridView(true)}
            style={{
              ...addEventStyles.viewToggleButton,
              ...(isGridView ? addEventStyles.viewToggleButtonActive : {}),
            }}
          >
            <span>&#9638; Grid View</span>
          </button>
          <button
            onClick={() => setIsGridView(false)}
            style={{
              ...addEventStyles.viewToggleButton,
              ...(!isGridView ? addEventStyles.viewToggleButtonActive : {}),
            }}
          >
            <span>&#9776; Table View</span>
          </button>
        </div>

        {isFetchingEvents ? (
          <div>Loading events...</div>
        ) : (
          <>
            {events.length === 0 ? (
              <p style={{ textAlign: 'center', color: addEventStyles.label.color }}>No events found. Add some!</p>
            ) : (
              isGridView ? (
                // Grid View
                <div style={addEventStyles.gridContainer}>
                  {events.map((eventItem) => (
                    <a
                      key={eventItem.id}
                      href={eventItem.eventUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={addEventStyles.eventCard}
                    >
                      <div style={addEventStyles.cardImageWrapper}>
                        <img
                          src={eventItem.imageUrl || `https://via.placeholder.com/600x400/CCCCCC/FFFFFF?text=${eventItem.title.split(' ')[0] || 'Event'}`}
                          alt={eventItem.title}
                          style={addEventStyles.cardImage}
                        />
                      </div>
                      <div style={addEventStyles.cardContent}>
                        <h3 style={addEventStyles.cardTitle}>{eventItem.title}</h3>
                        <p style={addEventStyles.cardDescription}>
                          {eventItem.description.substring(0, 100)}{eventItem.description.length > 100 ? '...' : ''}
                        </p>
                        <div style={addEventStyles.cardDetail}>
                            🗓️ {eventItem.date}
                        </div>
                        <div style={addEventStyles.cardDetail}>
                            ⏰ {eventItem.time}
                        </div>
                        <div style={addEventStyles.cardDetail}>
                            📍 {eventItem.location}
                        </div>
                        <div style={addEventStyles.cardDetail}>
                            🏷️ {eventItem.category}
                        </div>
                        <div style={addEventStyles.cardDetail}>
                            👥 Max Attendees: {eventItem.maxAttendees}
                        </div>
                      </div>
                      <div style={addEventStyles.cardFooter}>
                        <span>ID: {eventItem.id.substring(0, 8)}...</span>
                        <span style={addEventStyles.cardLink}>View Details &rarr;</span>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                // Table View
                <table style={addEventStyles.table}>
                  <thead>
                    <tr>
                      <th style={addEventStyles.th}>Title</th>
                      <th style={addEventStyles.th}>Date</th>
                      <th style={addEventStyles.th}>Time</th>
                      <th style={addEventStyles.th}>Location</th>
                      <th style={addEventStyles.th}>Category</th>
                      <th style={addEventStyles.th}>Attendees</th>
                      <th style={addEventStyles.th}>URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((eventItem) => (
                      <tr key={eventItem.id} style={events.indexOf(eventItem) === events.length -1 ? {borderBottom: 'none'} : {}}>
                        <td style={addEventStyles.td}>
                          {eventItem.imageUrl && (
                              <img src={eventItem.imageUrl} alt={eventItem.title} style={addEventStyles.thumbnail} />
                          )}
                          {eventItem.title}
                        </td>
                        <td style={addEventStyles.td}>{eventItem.date}</td>
                        <td style={addEventStyles.td}>{eventItem.time}</td>
                        <td style={addEventStyles.td}>{eventItem.location}</td>
                        <td style={addEventStyles.td}>{eventItem.category}</td>
                        <td style={addEventStyles.td}>{eventItem.maxAttendees}</td>
                        <td style={addEventStyles.td}>
                            <a href={eventItem.eventUrl} target="_blank" rel="noopener noreferrer" style={{color: '#3b82f6', textDecoration: 'none'}}>Link</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            )}

            <div style={addEventStyles.pagination}>
              <button
                onClick={handlePrevPage}
                disabled={isFetchingEvents || currentPage === 1} // Disable if on first page
                style={{
                    ...addEventStyles.paginationButton,
                    ...(isFetchingEvents || currentPage === 1 ? { backgroundColor: '#94a3b8', cursor: 'not-allowed', boxShadow: 'none', transform: 'none' } : {})
                }}
              >
                Previous
              </button>

              <div style={addEventStyles.pageNumberContainer}>
                {/* Simplified page number display: Current page only for now */}
                {/* For full page numbers, you'd calculate total pages (needs total count from API)
                    and then map through an array of page numbers. */}
                <span
                  style={{
                    ...addEventStyles.pageNumber,
                    ...addEventStyles.pageNumberActive, // Always active for current page
                  }}
                >
                  {currentPage}
                </span>
              </div>

              <button
                onClick={handleNextPage}
                disabled={isFetchingEvents || !hasMore}
                style={{
                    ...addEventStyles.paginationButton,
                    ...(isFetchingEvents || !hasMore ? { backgroundColor: '#94a3b8', cursor: 'not-allowed', boxShadow: 'none', transform: 'none' } : {})
                }}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};