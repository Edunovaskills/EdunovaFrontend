import React from 'react'
import EventsShowcase from 'features/components/events/EventDetails'
import { EventTestimonials } from 'features/components/events/EventTestimonials'
import { HeroSection } from 'shared/components'

const EventsPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection
        title="Join Our Learning Adventures!"
        subtitle="Edunova Community Events"
        description="Discover a world of engaging webinars, interactive workshops, and inspiring seminars designed to enrich your knowledge and connect you with experts and fellow learners. Don't miss out on upcoming opportunities to grow!"
        type="events"
      />
      <EventsShowcase />
      <EventTestimonials />
    </div>
  )
}

export default EventsPage
