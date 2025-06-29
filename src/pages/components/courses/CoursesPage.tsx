import React from 'react'
import { HeroSection } from 'shared/components/HeroSection'
import {
  CoursesShowcase,
  CourseFeatures,
  CourseStats,
  CourseBenefits,
} from 'features/components/Courses'
import { CoursesPageContainer } from './CoursesPage.styles'

const CoursesPage = () => {
  return (
    <CoursesPageContainer>
      <HeroSection
        title="Master New Skills Today!"
        subtitle="Edunova Professional Courses"
        description="Unlock your potential with our comprehensive courses designed by industry experts. From web development to data science, we offer hands-on learning experiences that prepare you for real-world challenges and career advancement."
        type="courses"
      />
      <CoursesShowcase />
      <CourseFeatures />
      <CourseStats />
      <CourseBenefits />
    </CoursesPageContainer>
  )
}

export const Courses: React.FC = () => {
  return <CoursesPage />
}
