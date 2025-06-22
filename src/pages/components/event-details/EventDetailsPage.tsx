import React from 'react'
import { EventDetails } from 'features/components/events'
import { useAppRouteParams } from 'entities/state'

const EventDetailsPage = () => {
  const { eventId } = useAppRouteParams({ params: 'eventId' })

  if (!eventId) {
    return null
  }

  return <EventDetails eventId={eventId} />
}

export default EventDetailsPage
