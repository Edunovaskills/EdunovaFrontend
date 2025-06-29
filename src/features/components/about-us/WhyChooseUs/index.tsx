import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import {
  CompanyStoryStyled
} from './styles.component';

export const WhyChooseUs: React.FC = () => {
  

  return (

      <CompanyStoryStyled>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Students in live session"
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
            <Typography variant="h3" component="h3" gutterBottom>
              Join Our Growing Community
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
              As a new company, we're building something special together with our students. 
              Every course, every event, and every interaction is an opportunity for us to 
              learn and grow alongside you.
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 3 }}>
              We believe in the power of live, interactive learning because it creates 
              connections, sparks creativity, and drives real understanding. When you 
              choose Edunova, you're not just taking a course – you're joining a movement.
            </Typography>
            <Box
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                borderLeft: '4px solid #667eea',
                borderRadius: '12px',
              }}
            >
              <Typography variant="h6" gutterBottom>
                "Learning is not a spectator sport. It requires active participation, 
                real-time feedback, and genuine human connection."
              </Typography>
              <Typography variant="body2" color="text.secondary">
                - Our Philosophy at Edunova
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CompanyStoryStyled>
  );
};