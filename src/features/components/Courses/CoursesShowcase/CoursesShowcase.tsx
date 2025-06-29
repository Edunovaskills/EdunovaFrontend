import React from 'react';
import { BookOpen, Users, Star, Clock, Award } from 'lucide-react';
import { Card } from 'shared/components/card';
import { Carousel } from 'shared/components/Carousel';
import { LoadingSpinner } from 'shared/components/LoadingSpinner';
import {
  ShowcaseContainer,
  ShowcaseWrapper,
  SectionHeader,
  IconContainer,
  SectionTitle,
  SectionDescription,
  EmptyState,
  StatsSection,
  StatItem,
  StatIconContainer,
  StatNumber,
  StatLabel,
  CourseCard,
  CourseImageContainer,
  CourseContent,
  CourseTitle,
  CourseDescription,
  CourseMetaRow,
  CourseMeta,
  CoursePrice,
  OriginalPrice,
  CourseRating,
  CourseInstructor,
  EnrollButton
} from './CoursesShowcase.styles';

interface CoursesShowcaseProps {
  useGetAllCoursesQuery: () => {
    data: { data: { courses: any[] } } | undefined;
    isLoading: boolean;
    isError: boolean;
  };
  onCourseClick: (courseId: string) => void;
}

const CoursesShowcase: React.FC<CoursesShowcaseProps> = ({ 
  useGetAllCoursesQuery, 
  onCourseClick 
}) => {
  const { data, isLoading, isError } = useGetAllCoursesQuery();
  const courses = data?.data?.courses || [];

  const handleCourseClick = (courseId: string) => {
    onCourseClick(courseId);
  };

  const handleEnrollClick = (e: React.MouseEvent, paymentUrl: string) => {
    e.stopPropagation();
    if (paymentUrl) {
      window.open(paymentUrl, '_blank');
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading amazing courses..." />;
  }

  return (
    <ShowcaseContainer>
      <ShowcaseWrapper>
        <SectionHeader>
          <IconContainer>
            <div>
              <BookOpen />
            </div>
          </IconContainer>
          <SectionTitle>Featured Courses</SectionTitle>
          <SectionDescription>
            Discover our carefully curated selection of professional courses designed to accelerate 
            your career growth and help you master in-demand skills with hands-on projects and expert guidance.
          </SectionDescription>
        </SectionHeader>

        {isError ? (
          <EmptyState>
            <BookOpen />
            <h3>Unable to Load Courses</h3>
            <p>Please try again later. We're working to resolve this issue.</p>
          </EmptyState>
        ) : courses.length > 0 ? (
          <Carousel
            slidesToShow={3}
            autoPlay={true}
            autoPlayInterval={6000}
            showNavigation={true}
            showPagination={true}
          >
            {courses.map((course) => (
              <CourseCard key={course._id} onClick={() => handleCourseClick(course._id)}>
                <CourseImageContainer>
                  <img
                    src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop'}
                    alt={course.title}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop';
                    }}
                  />
                  <div className="overlay">
                    <div className="level-badge">{course.level}</div>
                    <div className="duration-badge">
                      <Clock size={14} />
                      {course.duration}
                    </div>
                  </div>
                </CourseImageContainer>

                <CourseContent>
                  <CourseTitle>{course.title}</CourseTitle>
                  
                  <CourseDescription>{course.description}</CourseDescription>

                  <CourseInstructor>
                    <Award size={16} />
                    Instructor: {course.instructor}
                  </CourseInstructor>

                  <CourseMetaRow>
                    <CourseMeta>
                      <Star size={16} />
                      <span>{course.rating}</span>
                    </CourseMeta>
                    <CourseMeta>
                      <Users size={16} />
                      <span>{course.students.toLocaleString()} students</span>
                    </CourseMeta>
                  </CourseMetaRow>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CoursePrice $isFree={course.price === 0}>
                        {course.price === 0 ? 'Free' : `₹${course.price.toLocaleString()}`}
                      </CoursePrice>
                      {course.originalPrice && course.price > 0 && (
                        <OriginalPrice>₹{course.originalPrice.toLocaleString()}</OriginalPrice>
                      )}
                    </div>
                  </div>

                  <EnrollButton
                    onClick={(e) => handleEnrollClick(e, course.paymentUrl)}
                    disabled={!course.paymentUrl}
                  >
                    {course.price === 0 ? 'Enroll Free' : 'Enroll Now'}
                  </EnrollButton>
                </CourseContent>
              </CourseCard>
            ))}
          </Carousel>
        ) : (
          <EmptyState>
            <BookOpen />
            <h3>No Courses Available</h3>
            <p>Check back soon for exciting new courses!</p>
          </EmptyState>
        )}

        <StatsSection>
          <StatItem>
            <StatIconContainer $color="#dcfce7">
              <div>
                <Users />
              </div>
            </StatIconContainer>
            <StatNumber>15,000+</StatNumber>
            <StatLabel>Students Enrolled</StatLabel>
          </StatItem>
          <StatItem>
            <StatIconContainer $color="#dbeafe">
              <div>
                <BookOpen />
              </div>
            </StatIconContainer>
            <StatNumber>120+</StatNumber>
            <StatLabel>Courses Available</StatLabel>
          </StatItem>
          <StatItem>
            <StatIconContainer $color="#f3e8ff">
              <div>
                <Award />
              </div>
            </StatIconContainer>
            <StatNumber>95%</StatNumber>
            <StatLabel>Completion Rate</StatLabel>
          </StatItem>
        </StatsSection>
      </ShowcaseWrapper>
    </ShowcaseContainer>
  );
};

export default CoursesShowcase;