import React from 'react';
import { ArrowLeft, BookOpen, Clock, Users, Star, Award, PlayCircle, Download, Share2 } from 'lucide-react';
import { LoadingSpinner } from 'shared/components/LoadingSpinner';
import {
  DetailsContainer,
  Header,
  HeaderContent,
  BackButton,
  MainContent,
  ContentGrid,
  LeftColumn,
  RightColumn,
  HeroImageContainer,
  HeroContent,
  BadgeContainer,
  Badge,
  HeroTitle,
  InfoCard,
  InfoGrid,
  InfoItem,
  InfoIcon,
  InfoDetails,
  ProgressSection,
  ProgressHeader,
  ProgressBar,
  ProgressFill,
  SectionTitle,
  DescriptionText,
  CurriculumList,
  CurriculumItem,
  CurriculumIcon,
  CurriculumContent,
  InstructorSection,
  InstructorAvatar,
  InstructorInfo,
  RatingContainer,
  SidebarCard,
  PriceSection,
  Price,
  OriginalPrice,
  PriceLabel,
  EnrollButton,
  ActionButtons,
  SecondaryButton,
  IncludedSection,
  IncludedList,
  IncludedItem,
  StatsCard,
  StatsList,
  StatItem
} from './CourseDetails.styles';

interface CourseDetailsProps {
  courseId: string;
  useCourseByIdQuery: (courseId: string) => {
    data: { data: { course: any } } | undefined;
    isLoading: boolean;
    isError: boolean;
  };
  onBackToCourses: () => void;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ 
  courseId, 
  useCourseByIdQuery, 
  onBackToCourses 
}) => {
  const { data, isLoading, isError } = useCourseByIdQuery(courseId);
  const course = data?.data?.course;

  const handleEnroll = () => {
    if (course?.paymentUrl) {
      window.open(course.paymentUrl, '_blank');
    }
  };

  const handleShare = () => {
    if (navigator.share && course) {
      navigator.share({
        title: course.title,
        text: course.description.substring(0, 100) + '...',
        url: window.location.href,
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading course details..." />;
  }

  if (isError || !course) {
    return (
      <DetailsContainer>
        <Header>
          <HeaderContent>
            <BackButton onClick={onBackToCourses}>
              <ArrowLeft />
              Back to Courses
            </BackButton>
          </HeaderContent>
        </Header>
        <MainContent>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '60vh', 
            flexDirection: 'column', 
            gap: '1rem', 
            textAlign: 'center' 
          }}>
            <InfoCard style={{ maxWidth: '32rem', padding: '2rem' }}>
              <SectionTitle style={{ color: '#dc2626', marginBottom: '1rem' }}>
                Course Not Found
              </SectionTitle>
              <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                The course you're looking for doesn't exist or has been removed.
              </p>
              <EnrollButton 
                $disabled={false} 
                onClick={onBackToCourses}
                style={{ background: '#2563eb' }}
              >
                Back to Courses
              </EnrollButton>
            </InfoCard>
          </div>
        </MainContent>
      </DetailsContainer>
    );
  }

  // Provide fallbacks for optional fields
  const duration = course.duration || 'Self-paced';
  const level = course.level || 'All Levels';
  const students = course.students || 0;
  const rating = course.rating || 4.5;
  const instructor = course.instructor || 'Expert Instructor';
  const curriculum = course.curriculum || [
    { title: 'Introduction to the Course', duration: '30 min' },
    { title: 'Setting Up Your Environment', duration: '45 min' },
    { title: 'Core Concepts', duration: '2 hours' },
    { title: 'Hands-on Projects', duration: '3 hours' },
    { title: 'Advanced Topics', duration: '2.5 hours' },
    { title: 'Final Project', duration: '4 hours' }
  ];

  const progressPercentage = 75; // Mock progress

  return (
    <DetailsContainer>
      <Header>
        <HeaderContent>
          <BackButton onClick={onBackToCourses}>
            <ArrowLeft />
            Back to Courses
          </BackButton>
        </HeaderContent>
      </Header>

      <MainContent>
        <ContentGrid>
          <LeftColumn>
            <HeroImageContainer>
              <img 
                src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop'} 
                alt={course.title}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop';
                }}
              />
              <HeroContent>
                <BadgeContainer>
                  <Badge $variant="price">
                    {course.price === 0 ? 'Free Course' : `₹${course.price.toLocaleString()}`}
                  </Badge>
                  <Badge $variant="level">
                    {level}
                  </Badge>
                </BadgeContainer>
                <HeroTitle>{course.title}</HeroTitle>
              </HeroContent>
            </HeroImageContainer>

            <InfoCard>
              <InfoGrid>
                <InfoItem>
                  <InfoIcon $color="#dcfce7">
                    <Clock />
                  </InfoIcon>
                  <InfoDetails>
                    <p>Duration</p>
                    <p>{duration}</p>
                  </InfoDetails>
                </InfoItem>
                <InfoItem>
                  <InfoIcon $color="#dbeafe">
                    <Award />
                  </InfoIcon>
                  <InfoDetails>
                    <p>Level</p>
                    <p>{level}</p>
                  </InfoDetails>
                </InfoItem>
                <InfoItem>
                  <InfoIcon $color="#f3e8ff">
                    <Users />
                  </InfoIcon>
                  <InfoDetails>
                    <p>Students</p>
                    <p>{students.toLocaleString()} enrolled</p>
                  </InfoDetails>
                </InfoItem>
              </InfoGrid>

              <ProgressSection>
                <ProgressHeader>
                  <span>Course Completion Rate</span>
                  <span>{progressPercentage}%</span>
                </ProgressHeader>
                <ProgressBar>
                  <ProgressFill $percentage={progressPercentage} />
                </ProgressBar>
              </ProgressSection>

              <div>
                <SectionTitle>About This Course</SectionTitle>
                <DescriptionText>
                  {course.description.split('\n').map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </DescriptionText>
              </div>
            </InfoCard>

            <InfoCard>
              <SectionTitle>Course Curriculum</SectionTitle>
              <CurriculumList>
                {curriculum.map((item: any, index: number) => (
                  <CurriculumItem key={index}>
                    <CurriculumIcon>
                      <PlayCircle />
                    </CurriculumIcon>
                    <CurriculumContent>
                      <p>{item.title}</p>
                      <p>{item.duration}</p>
                    </CurriculumContent>
                  </CurriculumItem>
                ))}
              </CurriculumList>
            </InfoCard>

            <InfoCard>
              <SectionTitle>Meet Your Instructor</SectionTitle>
              <InstructorSection>
                <InstructorAvatar
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                  alt={instructor}
                />
                <InstructorInfo>
                  <h3>{instructor}</h3>
                  <p>Expert instructor with years of industry experience and a passion for teaching.</p>
                  <RatingContainer>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} style={{ color: '#fbbf24', fill: 'currentColor' }} />
                    ))}
                    <span>{rating} ({students > 0 ? Math.floor(students * 0.1) : 50} reviews)</span>
                  </RatingContainer>
                </InstructorInfo>
              </InstructorSection>
            </InfoCard>
          </LeftColumn>

          <RightColumn>
            <SidebarCard>
              <PriceSection>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                  <Price>
                    {course.price === 0 ? 'Free' : `₹${course.price.toLocaleString()}`}
                  </Price>
                  {course.originalPrice && course.price > 0 && (
                    <OriginalPrice>₹{course.originalPrice.toLocaleString()}</OriginalPrice>
                  )}
                </div>
                <PriceLabel>Lifetime access</PriceLabel>
              </PriceSection>

              <EnrollButton
                $disabled={!course.paymentUrl}
                onClick={handleEnroll}
                disabled={!course.paymentUrl}
              >
                {course.price === 0 ? 'Enroll Free' : 'Enroll Now'}
              </EnrollButton>

              <ActionButtons>
                <SecondaryButton onClick={handleShare}>
                  <Share2 />
                  Share
                </SecondaryButton>
                <SecondaryButton>
                  <Download />
                  Syllabus
                </SecondaryButton>
              </ActionButtons>

              <IncludedSection>
                <h3>This Course Includes</h3>
                <IncludedList>
                  <IncludedItem>Lifetime access to course content</IncludedItem>
                  <IncludedItem>Hands-on projects and assignments</IncludedItem>
                  <IncludedItem>Certificate of completion</IncludedItem>
                  <IncludedItem>Access to course community</IncludedItem>
                  <IncludedItem>Mobile and desktop access</IncludedItem>
                  <IncludedItem>Downloadable resources</IncludedItem>
                </IncludedList>
              </IncludedSection>
            </SidebarCard>

            <StatsCard>
              <h3>Course Stats</h3>
              <StatsList>
                <StatItem>
                  <span>Created</span>
                  <span>{new Date(course.createdAt).toLocaleDateString()}</span>
                </StatItem>
                <StatItem>
                  <span>Last Updated</span>
                  <span>{new Date(course.updatedAt).toLocaleDateString()}</span>
                </StatItem>
                <StatItem>
                  <span>Language</span>
                  <span>English</span>
                </StatItem>
                <StatItem>
                  <span>Rating</span>
                  <span>{rating}/5</span>
                </StatItem>
              </StatsList>
            </StatsCard>
          </RightColumn>
        </ContentGrid>
      </MainContent>
    </DetailsContainer>
  );
};

export default CourseDetails;