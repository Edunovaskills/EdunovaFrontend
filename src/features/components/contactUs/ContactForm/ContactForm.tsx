import React, { useState } from 'react';
import { Typography, Box, Grid, TextField, Button, Chip } from '@mui/material';
import { Send, User, Mail, Phone, MessageSquare, Sparkles, Heart, Zap, Star } from 'lucide-react';
import {
  SectionContainerStyled,
  FormContainerStyled,
  FormCardStyled,
  InfoCardStyled,
  IconWrapperStyled,
  SubmitButtonStyled,
  ContactInfoWrapperStyled,
  FeatureBadgeStyled,
  FloatingShapeStyled,
  GradientTextStyled,
  AnimatedIconStyled
} from './styles';
import { useForm } from 'react-hook-form';
import { enquirySchema, type EnquirySchema } from 'features/schema'; // Assuming these paths
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateEnquiryMutation } from 'entities/mutation'; // Assuming this path


export const ContactForm: React.FC = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { mutateAsync: createEnquiry, isPending } = useCreateEnquiryMutation();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm<EnquirySchema>({
    resolver: yupResolver(enquirySchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      message: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: EnquirySchema) => {
    try {
      await createEnquiry({ ...data, phone: `+91 ${data.phone}` });
      reset();
      
    } catch (error) {
      console.error("Failed to send enquiry:", error);
    }
  };

  const contactInfo = [
  {
    icon: (
      <a href="tel:+919891279370" target="_blank" rel="noopener noreferrer">
        <Phone size={24} />
      </a>
    ),
    title: 'Phone Support',
    primary: (
      <a href="tel:+919891279370" style={{ color: 'white', fontWeight: 'bold' }}>
        +91 9891 279370
      </a>
    ),
    secondary: 'Available 24/7 for urgent queries',
    badge: '24/7',
    color: '#4CAF50',
  },
  {
    icon: (
      <a href="mailto:support@edunova.com" target="_blank" rel="noopener noreferrer">
        <Mail size={24} />
      </a>
    ),
    title: 'Email Support',
    primary: (
      <a
        href="mailto:support@edunova.com"
        style={{ color: 'white', fontWeight: 'bold' }}
      >
        support@edunova.com
      </a>
    ),
    secondary: 'Response within 2 hours',
    badge: '< 2hrs',
    color: '#2196F3',
  },
];

  const features = [
    { icon: <Zap size={14} />, text: 'Quick Response' },
    { icon: <Heart size={14} />, text: 'Personal Touch' },
    { icon: <Star size={14} />, text: 'Expert Guidance' }
  ];

  return (
    <SectionContainerStyled>
      <FloatingShapeStyled className="shape-1" />
      <FloatingShapeStyled className="shape-2" />
      <FloatingShapeStyled className="shape-3" />
      
      <Box sx={{ textAlign: 'center', mb: 8, position: 'relative', zIndex: 2 }}>
        <AnimatedIconStyled>
          <MessageSquare size={40} />
          <Box className="sparkle sparkle-1">
            <Sparkles size={16} />
          </Box>
          <Box className="sparkle sparkle-2">
            <Star size={12} />
          </Box>
        </AnimatedIconStyled>
        
        <GradientTextStyled variant="h1" component="h2" gutterBottom>
          Get in <span className="highlight">Touch</span>
        </GradientTextStyled>
        
        <Typography variant="h6" color="text.secondary" sx={{ 
          maxWidth: '600px', 
          mx: 'auto', 
          lineHeight: 1.6, 
          fontSize: '1.1rem',
          mb: 3
        }}>
          Ready to start your learning journey? We're here to help you discover 
          the perfect course and answer all your questions.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          {features.map((feature, index) => (
            <Chip
              key={index}
              icon={feature.icon}
              label={feature.text}
              size="small"
              sx={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                color: '#667eea',
                border: '1px solid rgba(102, 126, 234, 0.2)',
                fontWeight: 600,
                fontSize: '0.85rem',
                '& .MuiChip-icon': {
                  color: '#667eea'
                },
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
                  transform: 'translateY(-1px)',
                }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* The success alert logic needs to be tied to the API call success, not just a timeout */}
      {/* For now, it's removed as it was stateful and not directly linked to API success. */}
      {/* You can re-implement it using a state that gets set after a successful `createEnquiry` call */}

      <FormContainerStyled>
        <Grid container spacing={6} alignItems="stretch">
          <Grid item xs={12} lg={7}>
            <FormCardStyled component="form" onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ 
                  mb: 1.5, 
                  fontWeight: 700, 
                  color: '#1a1a2e'
                }}>
                  Send Us a Message
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ 
                  fontSize: '1rem', 
                  lineHeight: 1.5,
                  opacity: 0.8
                }}>
                  Fill out the form below and we'll get back to you as soon as possible.
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    {...register('fullName')}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder="Enter your full name"
                    InputProps={{
                      startAdornment: (
                        <User 
                          size={20} 
                          style={{ 
                            marginRight: '10px', 
                            color: focusedField === 'fullName' ? '#667eea' : '#999',
                            transition: 'color 0.3s ease'
                          }} 
                        />
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: '56px',
                        fontSize: '1rem',
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder="your.email@example.com"
                    InputProps={{
                      startAdornment: (
                        <Mail 
                          size={20} 
                          style={{ 
                            marginRight: '10px', 
                            color: focusedField === 'email' ? '#667eea' : '#999',
                            transition: 'color 0.3s ease'
                          }} 
                        />
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: '56px',
                        fontSize: '1rem',
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...register('phone')}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="XXXXX XXXXX" // Changed placeholder for consistency with GetInTouch
                    InputProps={{
                      inputProps: {
                        maxLength: 10, // Added maxLength for consistency
                      },
                      startAdornment: (
                        <>
                          <Phone 
                            size={20} 
                            style={{ 
                              marginRight: '10px', 
                              color: focusedField === 'phone' ? '#667eea' : '#999',
                              transition: 'color 0.3s ease'
                            }} 
                          />
                          <Typography variant="body1" sx={{ mr: 1, color: focusedField === 'phone' ? '#667eea' : '#999' }}>
                            +91
                          </Typography>
                        </>
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: '56px',
                        fontSize: '1rem',
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    {...register('message')}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder="Tell us about your learning goals, questions, or how we can help you..."
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontSize: '1rem',
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SubmitButtonStyled
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<Send size={20} />}
                    fullWidth
                    disabled={!isValid || isPending}
                    // You might need a loading prop for SubmitButtonStyled if it's a custom component
                    // For now, if it's a styled MUI Button, you can use the 'loading' prop if it supports it.
                    // If not, you'd add a <CircularProgress /> inside the button.
                  >
                    {isPending ? 'Sending...' : 'Send Message'}
                  </SubmitButtonStyled>
                </Grid>
              </Grid>
            </FormCardStyled>
          </Grid>
          
          <Grid item xs={12} lg={5}>
            <ContactInfoWrapperStyled>
              <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 700, color: 'white' }}>
                Contact Information
              </Typography>
              <Typography variant="body1" sx={{ 
                mb: 4, 
                lineHeight: 1.6, 
                color: 'rgba(255,255,255,0.9)', 
                fontSize: '1rem' 
              }}>
                We're here to help you succeed! Whether you have questions about our courses 
                or need guidance, our team is ready to assist you.
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {contactInfo.map((info, index) => (
                  <InfoCardStyled key={index}>
                    <IconWrapperStyled sx={{ background: info.color }}>
                      {info.icon}
                    </IconWrapperStyled>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', fontSize: '1.1rem' }}>
                          {info.title}
                        </Typography>
                        <FeatureBadgeStyled sx={{ background: info.color }}>
                          {info.badge}
                        </FeatureBadgeStyled>
                      </Box>
                      <Typography variant="body1" gutterBottom sx={{ 
                        fontWeight: 600, 
                        color: '#8fa4f3', 
                        fontSize: '1rem' 
                      }}>
                        {info.primary}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(255,255,255,0.8)', 
                        lineHeight: 1.5,
                        fontSize: '0.9rem'
                      }}>
                        {info.secondary}
                      </Typography>
                    </Box>
                  </InfoCardStyled>
                ))}
              </Box>

              <Box sx={{ 
                mt: 4, 
                p: 3, 
                borderRadius: '16px', 
                background: 'rgba(255,255,255,0.1)', 
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                textAlign: 'center'
              }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 600 }}>
                  Ready to Get Started?
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'rgba(255,255,255,0.8)', 
                  mb: 2,
                  lineHeight: 1.5
                }}>
                  Fill out the form and we'll reach out with personalized guidance.
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    borderRadius: '20px',
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.1)',
                      borderColor: 'white',
                    }
                  }}
                  // This button likely navigates or triggers another action, not directly submits the form
                  // If it's meant to trigger the form submission, you'd need to adjust its logic
                >
                  Connect Now
                </Button>
              </Box>
            </ContactInfoWrapperStyled>
          </Grid>
        </Grid>
      </FormContainerStyled>
    </SectionContainerStyled>
  );
};