// src/components/ServicesShowcase/Services.tsx
import React, { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Modal,
} from '@mui/material'
import { BuzInfoSection } from 'entities/component'
import { Carousel } from 'shared/components/Carousel'
import { Card } from 'shared/components/card'
import {
  ModalContentBox,
  ModalImageBox,
  ModalTextBox,
  CloseButton,
} from './styles.component'
import { useCourseByIdQuery, useGetAllCoursesQuery } from 'entities/query'
import CloseIcon from '@mui/icons-material/Close'

const TopInfo: React.FC = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Stack
      alignItems="center"
      gap={isSmallScreen ? '5px' : '10px'}
      sx={{ px: isSmallScreen ? 2 : 0 }}
    >
      <Typography variant={isSmallScreen ? 'h5' : 'h4.700'} textAlign="center">
        Our Courses
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        maxWidth={isSmallScreen ? '100%' : '80%'}
        sx={{ fontSize: isSmallScreen ? '0.9rem' : '1rem' }}
      >
        Travel through your education with ease and comfort at Edunova, where
        our courses provide top-notch lessons and skilled instructors for a
        safe, enriching academic journey—ideal for daily learning, skill
        enhancement, or intellectual growth.
      </Typography>
    </Stack>
  )
}

const PLACEHOLDER_IMAGE_URL =
  'https://digitallearning.eletsonline.com/wp-content/uploads/2019/03/Online-courses.jpg'

// Utility function to decode HTML entities in the image URL
const decodeHTMLEntities = (text: string = '') => {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

const ServicesShowcase: React.FC = () => {
  const { data, isLoading, error } = useGetAllCoursesQuery()
  const [clickedId, setClickedId] = useState<string | undefined>(undefined)
  const { data: courseDetails, isLoading: isCourseDetailsLoading } =
    useCourseByIdQuery(clickedId)
  const [open, setOpen] = useState(false)

  const handleCourseClick = (courseId: string) => {
    setClickedId(courseId)
    setOpen(true)
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={200}
      >
        <Typography>Loading courses...</Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={200}
      >
        <Typography color="error">
          Error loading courses: {error.message}
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <Carousel
          slidesToShow={3}
          autoPlay={true}
          autoPlayInterval={5000}
          showNavigation={true}
          showPagination={true}
        >
          {data?.data?.courses.map((course) => (
            <Card
              key={course._id}
              title={course.title}
              description={course.description}
              image={course.image}
              onClick={() => handleCourseClick(course._id)}
              type="course"
            />
          ))}
        </Carousel>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="course-details-modal"
        aria-describedby="course-details"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1500,
        }}
      >
        <ModalContentBox
          sx={{
            background: 'rgba(255,255,255,0.98)',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            p: { xs: 2, sm: 4 },
            minWidth: { xs: '90vw', sm: 450 },
            maxWidth: 540,
            position: 'relative',
          }}
        >
          {isCourseDetailsLoading ? (
            <Typography>Loading....</Typography>
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  mb: 2,
                }}
              >
                <Typography variant="body1.600">Course Detail</Typography>
                <CloseButton
                  onClick={() => setOpen(false)}
                  sx={{
                    color: 'grey.700',
                    background: 'rgba(0,0,0,0.04)',
                    '&:hover': { background: 'rgba(0,0,0,0.12)' },
                    borderRadius: 2,
                  }}
                >
                  <CloseIcon fontSize="medium" />
                </CloseButton>
              </Box>
              <ModalImageBox
                sx={{
                  mt: 1,
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: 220,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                  borderRadius: 3,
                  overflow: 'hidden',
                  background: '#f7f7f7',
                }}
              >
                <img
                  src={
                    decodeHTMLEntities(
                      courseDetails?.data?.course.image || ''
                    ) || PLACEHOLDER_IMAGE_URL
                  }
                  alt={courseDetails?.data?.course.title || 'Course Image'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 12,
                  }}
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE_URL
                  }}
                />
              </ModalImageBox>
              <ModalTextBox>
                <Typography
                  variant="h6.500"
                  component="h2"
                  sx={{
                    mb: 1,
                    textAlign: 'left',
                    position: 'relative',
                    display: 'inline-block',
                    '&:after': {
                      content: '""',
                      display: 'block',
                      width: 40,
                      height: 3,
                      background:
                        'linear-gradient(90deg, #6C63FF 60%, #00C9A7 100%)',
                      borderRadius: 2,
                      marginTop: 2,
                    },
                  }}
                  gutterBottom
                >
                  {courseDetails?.data?.course.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    textAlign: 'left',
                  }}
                  component="div"
                  dangerouslySetInnerHTML={{
                    __html: (
                      courseDetails?.data?.course.description || ''
                    ).replace(
                      /(Skills Learned:|Job Prospects:|Top Companies:|Average Salary:)/g,
                      '<strong>$1</strong>'
                    ),
                  }}
                />
              </ModalTextBox>
            </>
          )}
        </ModalContentBox>
      </Modal>
    </>
  )
}

export const Services: React.FC = () => (
  <BuzInfoSection
    topInfo={<TopInfo />}
    showcaseSection={<ServicesShowcase />}
  />
)
