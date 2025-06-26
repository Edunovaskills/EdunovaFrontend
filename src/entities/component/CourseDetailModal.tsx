import React from 'react'
import { Box, Typography, Modal, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { Course } from 'entities/model/courses.model'

const PLACEHOLDER_IMAGE_URL =
  'https://digitallearning.eletsonline.com/wp-content/uploads/2019/03/Online-courses.jpg'

export const CourseDetailModal = ({
  open,
  onClose,
  course,
  loading,
}: {
  open: boolean
  onClose: () => void
  course: Course
  loading?: boolean
}) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="course-details-modal"
    aria-describedby="course-details"
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
        }}
      >
        <Typography variant="h6.700" component="h2">
          Course Detail
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#f5f7fa',
          borderRadius: 2,
          minHeight: 150,
        }}
      >
        <img
          src={course?.image || PLACEHOLDER_IMAGE_URL}
          alt={course?.title || 'Course Image'}
          style={{
            maxWidth: '100%',
            maxHeight: 200,
            borderRadius: 8,
            objectFit: 'cover',
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
          {course?.title}
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
          {course?.description}
        </Typography>
      </Box>
    </Box>
  </Modal>
)
