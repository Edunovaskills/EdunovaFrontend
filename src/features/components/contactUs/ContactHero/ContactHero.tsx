import React from 'react';
import { Typography, Box } from '@mui/material';
import { MessageCircle, Sparkles, Zap } from 'lucide-react';
import {
  SectionContainerStyled,
  HeroContentStyled,
  FloatingElementStyled,
  IconWrapperStyled,
  AnimatedTextStyled
} from './styles';

export const ContactHero: React.FC = () => {
  return (
    <SectionContainerStyled>
      <FloatingElementStyled className="floating-1" />
      <FloatingElementStyled className="floating-2" />
      <FloatingElementStyled className="floating-3" />
      <FloatingElementStyled className="floating-4" />
      
      <HeroContentStyled>
        <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 3 }}>
          <IconWrapperStyled sx={{ mx: 'auto', mb: 4 }}>
            <MessageCircle size={40} />
            <Box
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse 2s infinite'
              }}
            >
              <Sparkles size={12} />
            </Box>
          </IconWrapperStyled>
          
          <AnimatedTextStyled variant="h1" component="h1" gutterBottom>
            Let's Create Something
            <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #8fa4f3 0%, #f093fb 50%, #ffd89b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Amazing Together
            </span>
          </AnimatedTextStyled>
          
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'rgba(255,255,255,0.9)', 
              textAlign: 'center', 
              mb: 6, 
              maxWidth: '800px', 
              mx: 'auto', 
              lineHeight: 1.6,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              fontWeight: 400
            }}
          >
            Ready to transform your learning journey? We're here to help you discover 
            the perfect course, answer your questions, and guide you toward success.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
              '& .feature-badge': {
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 3,
                py: 1.5,
                borderRadius: '50px',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '0.95rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255,255,255,0.15)',
                  transform: 'translateY(-2px)',
                }
              }
            }}
          >
            <Box className="feature-badge">
              <Zap size={16} />
              Quick Response
            </Box>
            <Box className="feature-badge">
              <MessageCircle size={16} />
              24/7 Support
            </Box>
            <Box className="feature-badge">
              <Sparkles size={16} />
              Expert Guidance
            </Box>
          </Box>
        </Box>
      </HeroContentStyled>
    </SectionContainerStyled>
  );
};