// src/entities/component/BlogDetailModal.tsx
import React from 'react'
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { Blog } from 'entities/model/blog.model'

interface BlogDetailModalProps {
  open: boolean
  onClose: () => void
  blog: Blog | null
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  open,
  onClose,
  blog,
}) => {
  if (!blog) return null

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '70%', md: '50%' },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: '90vh',
    overflowY: 'auto',
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="blog-detail-title"
      aria-describedby="blog-detail-description"
    >
      <Paper sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id="blog-detail-title"
          variant="h5"
          component="h2"
          gutterBottom
        >
          {blog.title}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <img
            src={blog.image}
            alt={blog.title}
            style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }}
          />
        </Box>
        <Typography id="blog-detail-description" sx={{ mt: 2, mb: 2 }}>
          <strong>Description:</strong> {blog.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Status:</strong> {blog.isActive ? 'Active' : 'Inactive'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Created At:</strong>{' '}
          {new Date(blog.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Last Updated:</strong>{' '}
          {new Date(blog.updatedAt).toLocaleString()}
        </Typography>
        {blog.createdBy && (
          <Typography variant="body2" color="text.secondary">
            <strong>Created By:</strong> {blog.createdBy.name} (
            {blog.createdBy.email})
          </Typography>
        )}
      </Paper>
    </Modal>
  )
}
