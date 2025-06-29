import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import {
  CompanyStoryStyled,
  HighlightBoxStyled
} from './styles.component';

export const CompanyOverview: React.FC = () => {


  return (
    

      <CompanyStoryStyled>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h3" gutterBottom>
              Our Story: From Idea to Impact
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
              Edunova was born from a simple belief: learning should be interactive, engaging, 
              and accessible to everyone. As a new company in 2024, we're passionate about 
              revolutionizing education through live courses and real-time events.
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
              We specialize in creating immersive learning experiences where students can 
              interact directly with instructors, participate in live discussions, and 
              build connections with fellow learners from around the world.
            </Typography>
            <HighlightBoxStyled>
              <Typography variant="h6" gutterBottom>
                "The best learning happens when it's live, interactive, and engaging."
              </Typography>
              <Typography variant="body2" color="text.secondary">
                - Edunova Team
              </Typography>
            </HighlightBoxStyled>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Live Learning Session"
              sx={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
              }}
            />
          </Grid>
        </Grid>
      </CompanyStoryStyled>
    
  );
};