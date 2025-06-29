import React from 'react';
import { MessageSquare } from 'lucide-react';
import { TestimonialCard } from 'shared/components/TestimonialCardA';
import { Carousel } from 'shared/components/Carousel';
import {
  TestimonialsContainer,
  TestimonialsWrapper,
  SectionHeader,
  IconContainer,
  SectionTitle,
  SectionDescription,
  CallToActionContainer,
  CTACard,
  CTATitle,
  CTADescription,
  CTAButton
} from './EventTestimonials.styles';

const testimonials = [
  {
    name: 'Amit Sharma',
    feedback: 'The React workshop was incredibly insightful! The hands-on approach and expert guidance helped me understand complex concepts easily. Highly recommend for any developer looking to advance their skills.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    role: 'Frontend Developer'
  },
  {
    name: 'Priya Singh',
    feedback: 'Amazing event organization and content quality. The networking opportunities were fantastic, and I made valuable connections. The speakers were industry experts who shared practical insights.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    role: 'UI/UX Designer'
  },
  {
    name: 'Rahul Kumar',
    feedback: 'The full-stack bootcamp exceeded my expectations. The curriculum was well-structured, and the mentorship provided was exceptional. I landed my dream job within 3 months of completion!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    role: 'Full Stack Developer'
  },
  {
    name: 'Sneha Patel',
    feedback: 'The machine learning workshop was perfect for beginners. Complex topics were explained in simple terms with practical examples. The hands-on projects really helped solidify the concepts.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    role: 'Data Scientist'
  },
  {
    name: 'Vikash Gupta',
    feedback: 'Excellent learning environment and top-notch instructors. The event was well-organized with great attention to detail. I gained valuable skills that I immediately applied in my work.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    role: 'Software Engineer'
  }
];

const EventTestimonials = () => {
  return (
    <TestimonialsContainer>
      <TestimonialsWrapper>
        <SectionHeader>
          <IconContainer>
            <div>
              <MessageSquare />
            </div>
          </IconContainer>
          <SectionTitle>What Our Attendees Say</SectionTitle>
          <SectionDescription>
            Don't just take our word for it. Here's what our community members have to say 
            about their learning experience with us.
          </SectionDescription>
        </SectionHeader>

        <Carousel
          slidesToShow={3}
          autoPlay={true}
          autoPlayInterval={6000}
          showNavigation={true}
          showPagination={true}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              feedback={testimonial.feedback}
              avatar={testimonial.avatar}
              rating={testimonial.rating}
              role={testimonial.role}
            />
          ))}
        </Carousel>

        <CallToActionContainer>
          <CTACard>
            <CTATitle>Ready to Join Our Community?</CTATitle>
            <CTADescription>
              Be part of our growing community of learners and professionals. 
              Register for upcoming events and start your learning journey today.
            </CTADescription>
            <CTAButton>View All Events</CTAButton>
          </CTACard>
        </CallToActionContainer>
      </TestimonialsWrapper>
    </TestimonialsContainer>
  );
};

export default EventTestimonials;