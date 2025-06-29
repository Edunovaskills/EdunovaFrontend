import React, { useState, useEffect } from 'react'
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react'
import {
  StatsContainer,
  PatternOverlay,
  FloatingElement,
  StatsWrapper,
  SectionHeader,
  SectionDescription,
  StatsGrid,
  StatCard,
  StatIconContainer,
  StatNumber,
  StatLabel,
  StatSubtext,
} from './CourseStats.styles'
import { Typography } from '@mui/material'

const CourseStats = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    students: 0,
    courses: 0,
    certificates: 0,
    satisfaction: 0,
  })

  const finalNumbers = {
    students: 25000,
    courses: 150,
    certificates: 18500,
    satisfaction: 98,
  }

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60 // 60 steps for smooth animation
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedNumbers({
        students: Math.floor(finalNumbers.students * progress),
        courses: Math.floor(finalNumbers.courses * progress),
        certificates: Math.floor(finalNumbers.certificates * progress),
        satisfaction: Math.floor(finalNumbers.satisfaction * progress),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setAnimatedNumbers(finalNumbers)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      icon: Users,
      number: animatedNumbers.students.toLocaleString(),
      label: 'Happy Students',
      subtext: 'Worldwide learners',
    },
    {
      icon: BookOpen,
      number: animatedNumbers.courses.toString(),
      label: 'Expert Courses',
      subtext: 'Across all categories',
    },
    {
      icon: Award,
      number: animatedNumbers.certificates.toLocaleString(),
      label: 'Certificates Issued',
      subtext: 'Career achievements',
    },
    {
      icon: TrendingUp,
      number: `${animatedNumbers.satisfaction}%`,
      label: 'Success Rate',
      subtext: 'Student satisfaction',
    },
  ]

  return (
    <StatsContainer>
      <PatternOverlay />

      <FloatingElement $position="top: 10%; left: 5%;" $size="8rem" />
      <FloatingElement
        $position="bottom: 15%; right: 8%;"
        $size="12rem"
        $delay="1s"
      />
      <FloatingElement
        $position="top: 60%; left: 15%;"
        $size="6rem"
        $delay="0.5s"
      />
      <FloatingElement
        $position="top: 20%; right: 20%;"
        $size="10rem"
        $delay="1.5s"
      />

      <StatsWrapper>
        <SectionHeader>
          <Typography variant="h2">Our Impact in Numbers</Typography>
          <SectionDescription>
            Join thousands of successful learners who have transformed their
            careers through our comprehensive courses and expert guidance.
          </SectionDescription>
        </SectionHeader>

        <StatsGrid>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <StatCard key={index}>
                <StatIconContainer>
                  <div>
                    <IconComponent />
                  </div>
                </StatIconContainer>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
                <StatSubtext>{stat.subtext}</StatSubtext>
              </StatCard>
            )
          })}
        </StatsGrid>
      </StatsWrapper>
    </StatsContainer>
  )
}

export default CourseStats
