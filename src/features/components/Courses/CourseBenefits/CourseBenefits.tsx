import React from 'react';
import { CheckCircle, Star, Users, Clock } from 'lucide-react';
import {
  BenefitsContainer,
  BenefitsWrapper,
  ContentGrid,
  TextContent,
  SectionTitle,
  SectionDescription,
  BenefitsList,
  BenefitItem,
  BenefitIcon,
  BenefitContent,
  ImageContent,
  ImageContainer,
  ImageOverlay,
  FloatingCard,
  FloatingCardContent
} from './CourseBenefits.styles';

const benefits = [
  {
    icon: CheckCircle,
    title: 'Industry-Relevant Skills',
    description: 'Learn the latest technologies and methodologies that are in high demand in today\'s job market.'
  },
  {
    icon: Users,
    title: 'Expert Mentorship',
    description: 'Get personalized guidance from industry professionals who have years of real-world experience.'
  },
  {
    icon: Star,
    title: 'Portfolio Development',
    description: 'Build impressive projects that showcase your skills and help you stand out to potential employers.'
  },
  {
    icon: Clock,
    title: 'Lifetime Access',
    description: 'Enjoy unlimited access to course materials, updates, and community support even after completion.'
  }
];

const CourseBenefits = () => {
  return (
    <BenefitsContainer>
      <BenefitsWrapper>
        <ContentGrid>
          <TextContent>
            <SectionTitle>
              Transform Your Career with Our Comprehensive Learning Experience
            </SectionTitle>
            <SectionDescription>
              Our courses are designed to provide you with practical skills, real-world experience, 
              and the confidence you need to excel in your chosen field. Join thousands of successful 
              graduates who have advanced their careers through our programs.
            </SectionDescription>
            
            <BenefitsList>
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <BenefitItem key={index}>
                    <BenefitIcon>
                      <IconComponent />
                    </BenefitIcon>
                    <BenefitContent>
                      <h3>{benefit.title}</h3>
                      <p>{benefit.description}</p>
                    </BenefitContent>
                  </BenefitItem>
                );
              })}
            </BenefitsList>
          </TextContent>

          <ImageContent>
            <ImageContainer>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop"
                alt="Students learning together"
              />
              <ImageOverlay />
            </ImageContainer>

            <FloatingCard $position="top: 10%; right: -2rem;">
              <FloatingCardContent>
                <Star />
                <span>4.9/5 Rating</span>
              </FloatingCardContent>
            </FloatingCard>

            <FloatingCard $position="bottom: 15%; left: -2rem;">
              <FloatingCardContent>
                <Users />
                <span>25K+ Students</span>
              </FloatingCardContent>
            </FloatingCard>

            <FloatingCard $position="top: 50%; right: -1.5rem;">
              <FloatingCardContent>
                <CheckCircle />
                <span>Certified</span>
              </FloatingCardContent>
            </FloatingCard>
          </ImageContent>
        </ContentGrid>
      </BenefitsWrapper>
    </BenefitsContainer>
  );
};

export default CourseBenefits;