// src/entities/component/CourseDetailModal.tsx
import React from 'react'
import {
  Box,
  Typography,
  Modal,
  IconButton,
  CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { Course } from 'entities/model/courses.model'

const PLACEHOLDER_IMAGE_URL =
  'https://digitallearning.eletsonline.com/wp-content/uploads/2019/03/Online-courses.jpg'

interface CourseDetailModalProps {
  open: boolean
  onClose: () => void
  course: Course | null // Allow null for initial state or loading
  loading?: boolean
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  open,
  onClose,
  course,
  loading,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="course-details-modal-title"
      aria-describedby="course-details-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          minWidth: 350,
          maxWidth: 500,
          width: '90%',
          outline: 'none',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            mb: 2, // Added margin bottom for spacing
          }}
        >
          <Typography
            id="course-details-modal-title"
            variant="h6"
            component="h2"
          >
            Course Detail
          </Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : !course ? (
          <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
            <Typography>No course data available.</Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#f5f7fa',
                borderRadius: 2,
                minHeight: 150,
                overflow: 'hidden', // Ensure image respects border-radius
              }}
            >
              <img
                src={course.image || PLACEHOLDER_IMAGE_URL}
                alt={course.title || 'Course Image'}
                style={{
                  maxWidth: '100%',
                  maxHeight: 200,
                  width: '100%', // Make image take full width of its container
                  objectFit: 'cover',
                  borderRadius: 8, // Apply border radius to the image itself
                }}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                }}
                gutterBottom
              >
                {course.title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 2,
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                }}
              >
                {course.description}
              </Typography>
              {course.createdBy &&
                typeof course.createdBy !== 'string' && ( // Display createdBy if populated
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Created by: {course.createdBy.name} (
                    {course.createdBy.email})
                  </Typography>
                )}
            </Box>
          </>
        )}
      </Box>
    </Modal>
  )
}
