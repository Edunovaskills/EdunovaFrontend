import React from 'react'
import { BookOpen, Users, Award } from 'lucide-react'
import { LoadingSpinner } from 'shared/components/LoadingSpinner'
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
} from './CoursesShowcase.styles'
import { useGetAllCoursesQuery } from 'entities/query'
import { Services } from 'features/components/home/course'

const CoursesShowcase = () => {
  const { data, isLoading, isError } = useGetAllCoursesQuery()
  const courses = data?.data?.courses || []

  if (isLoading) {
    return <LoadingSpinner message="Loading amazing courses..." />
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
            Discover our carefully curated selection of professional courses
            designed to accelerate your career growth and help you master
            in-demand skills with hands-on projects and expert guidance.
          </SectionDescription>
        </SectionHeader>

        {isError ? (
          <EmptyState>
            <BookOpen />
            <h3>Unable to Load Courses</h3>
            <p>Please try again later. We're working to resolve this issue.</p>
          </EmptyState>
        ) : courses.length > 0 ? (
          <Services />
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
  )
}

export default CoursesShowcase
