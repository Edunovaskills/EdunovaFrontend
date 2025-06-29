import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { Heart, Users, BookOpen, Target, Lightbulb, Shield } from 'lucide-react';
import {
  SectionContainerStyled,
  MainContentStyled,
  HighlightBoxStyled,
  ValueCardStyled,
  IconWrapperStyled
} from './styles.component';

export const WhoWeAre: React.FC = () => {
  const coreValues = [
    {
      icon: <Heart size={24} />,
      title: 'Student-Centric',
      description: 'Every decision we make puts our students first'
    },
    {
      icon: <Target size={24} />,
      title: 'Innovation Driven',
      description: 'Transforming education through cutting-edge technology'
    },
    {
      icon: <Users size={24} />,
      title: 'Community Focused',
      description: 'Building connections that last beyond the classroom'
    },
    {
      icon: <Shield size={24} />,
      title: 'Quality Assured',
      description: 'Reliable and accessible learning experiences'
    },
    {
      icon: <Lightbulb size={24} />,
      title: 'Engaging Content',
      description: 'Making learning interactive and enjoyable'
    },
    {
      icon: <BookOpen size={24} />,
      title: 'Lifelong Learning',
      description: 'Supporting growth at every stage of your journey'
    }
  ];

  return (
    <SectionContainerStyled>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" component="h2" gutterBottom>
          Who <span style={{ color: '#667eea' }}>We Are?</span>
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.7 }}>
          Your Trusted Partner in Lifelong Learning
        </Typography>
      </Box>

      <MainContentStyled>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Students learning together"
              sx={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: '1.1rem', mb: 4 }}>
              At Edunova Academic, we are passionate about transforming education through innovation. 
              Our platform offers a student-centric, seamless way to access courses and resources 
              for any learning journey—whether it's academic growth or professional development.
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: '1.1rem', mb: 4 }}>
              We strive to provide an educational experience that is engaging, reliable, and 
              accessible to all. Our commitment goes beyond just delivering content; we're 
              building a community where learners can thrive and achieve their goals.
            </Typography>
            <HighlightBoxStyled>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Our Mission
              </Typography>
              <Typography variant="body2" color="text.secondary">
                To democratize quality education by making it interactive, accessible, 
                and tailored to each learner's unique journey and aspirations.
              </Typography>
            </HighlightBoxStyled>
          </Grid>
        </Grid>
      </MainContentStyled>

      <Box sx={{ mt: 10 }}>
        <Typography variant="h3" component="h3" gutterBottom sx={{ textAlign: 'center', mb: 6 }}>
          What Drives Us
        </Typography>
        <Grid container spacing={3}>
          {coreValues.map((value, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ValueCardStyled>
                <IconWrapperStyled>{value.icon}</IconWrapperStyled>
                <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 600 }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {value.description}
                </Typography>
              </ValueCardStyled>
            </Grid>
          ))}
        </Grid>
      </Box>
    </SectionContainerStyled>
  );
};