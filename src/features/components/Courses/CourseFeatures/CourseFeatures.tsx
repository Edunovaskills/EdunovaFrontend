import React from 'react';
import { Award, BookOpen, Users, Clock, Trophy, Zap } from 'lucide-react';
import {
  FeaturesContainer,
  FeaturesWrapper,
  SectionHeader,
  IconContainer,
  SectionTitle,
  SectionDescription,
  FeaturesGrid,
  FeatureCard,
  FeatureIconContainer,
  FeatureTitle,
  FeatureDescription
} from './CourseFeatures.styles';

const features = [
  {
    icon: BookOpen,
    title: 'Expert-Led Curriculum',
    description: 'Learn from industry professionals with years of real-world experience and proven track records.',
    color: '#dbeafe'
  },
  {
    icon: Users,
    title: 'Interactive Learning',
    description: 'Engage with peers and instructors through live sessions, group projects, and collaborative assignments.',
    color: '#dcfce7'
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Study at your own pace with lifetime access to course materials and recorded sessions.',
    color: '#f3e8ff'
  },
  {
    icon: Award,
    title: 'Industry Certification',
    description: 'Earn recognized certificates that boost your career prospects and validate your skills.',
    color: '#fef3c7'
  },
  {
    icon: Trophy,
    title: 'Career Support',
    description: 'Get job placement assistance, resume reviews, and interview preparation from our career team.',
    color: '#fee2e2'
  },
  {
    icon: Zap,
    title: 'Hands-On Projects',
    description: 'Build real-world projects that showcase your skills and create an impressive portfolio.',
    color: '#f0f9ff'
  }
];

const CourseFeatures = () => {
  return (
    <FeaturesContainer>
      <FeaturesWrapper>
        <SectionHeader>
          <IconContainer>
            <div>
              <Award />
            </div>
          </IconContainer>
          <SectionTitle>Why Choose Our Courses?</SectionTitle>
          <SectionDescription>
            Discover the unique advantages that make our courses stand out. From expert instruction 
            to hands-on learning, we provide everything you need to succeed in your career journey.
          </SectionDescription>
        </SectionHeader>

        <FeaturesGrid>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <FeatureCard key={index}>
                <FeatureIconContainer $color={feature.color}>
                  <div>
                    <IconComponent />
                  </div>
                </FeatureIconContainer>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            );
          })}
        </FeaturesGrid>
      </FeaturesWrapper>
    </FeaturesContainer>
  );
};

export default CourseFeatures;