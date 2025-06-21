// src/components/ServicesShowcase/Services.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  CardContent,
  Divider,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { BuzInfoSection, Carousel } from 'entities/component';
import { SwiperSlide } from 'swiper/react';
import { getCourses, ICourse } from '../../../../app/api/course.api';
import {
  CardStyled,
  ImgWrapperStyled,
  DescriptionContainer,
} from './styles.component';

const TopInfo: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack alignItems="center" gap={isSmallScreen ? '5px' : '10px'} sx={{ px: isSmallScreen ? 2 : 0 }}>
      <Typography variant={isSmallScreen ? 'h5' : 'h4.700'} textAlign="center">
        Our Courses
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        maxWidth={isSmallScreen ? '100%' : '80%'}
        sx={{ fontSize: isSmallScreen ? '0.9rem' : '1rem' }}
      >
        Travel through your education with ease and comfort at Edunova, where our courses provide top-notch lessons and skilled instructors for a safe, enriching academic journey—ideal for daily learning, skill enhancement, or intellectual growth.
      </Typography>
    </Stack>
  );
};

const PLACEHOLDER_IMAGE_URL =
  'https://digitallearning.eletsonline.com/wp-content/uploads/2019/03/Online-courses.jpg';

// Utility function to decode HTML entities in the image URL
const decodeHTMLEntities = (text: string = '') => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

const ServicesShowcase: React.FC = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data.data.courses);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const getSlidesPerView = () => {
    if (isSmallScreen) return 1.2;
    if (isMediumScreen) return 2.2;
    return 3.5;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={200}>
        <Typography>Loading courses...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={200}>
        <Typography color="error">Error loading courses: {error}</Typography>
      </Box>
    );
  }

  return (
    <Carousel
      slidesPerView={getSlidesPerView()}
      spaceBetween={isSmallScreen ? 15 : 30}
      centeredSlides={isSmallScreen}
      loop={courses.length > getSlidesPerView()}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation={!isSmallScreen}
      freeMode
    >
      {courses.map((course) => {
        const decodedImage = decodeHTMLEntities(course.image || '');
        return (
          <SwiperSlide key={course._id}>
            <CardStyled>
              <ImgWrapperStyled>
                <img
                  src={decodedImage || PLACEHOLDER_IMAGE_URL}
                  alt={course.title || 'Course Image'}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE_URL;
                  }}
                />
              </ImgWrapperStyled>
              <Divider sx={{ mt: 2 }} />
              <CardContent component={Stack} spacing={1.5} sx={{ flexGrow: 1, p: 2 }}>
                <Typography
                  variant="h6.600"
                  sx={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {course.title}
                </Typography>
                <DescriptionContainer variant="body2">
                  {course.description}
                </DescriptionContainer>
              </CardContent>
            </CardStyled>
          </SwiperSlide>
        );
      })}
    </Carousel>
  );
};

export const Services: React.FC = () => (
  <BuzInfoSection topInfo={<TopInfo />} showcaseSection={<ServicesShowcase />} />
);
