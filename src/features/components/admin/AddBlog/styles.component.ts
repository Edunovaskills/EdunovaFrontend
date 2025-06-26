// src/features/components/admin/AddBlog/styles.component.ts
import type { SxProps, Theme } from '@mui/material';

// Define common CSS properties for reuse and consistency
const commonInputStyles: SxProps<Theme> = {
  width: '100%',
  padding: '0.75rem',
  border: '1px solid #cbd5e1', // slate-300
  borderRadius: '0.5rem', // rounded-lg
  fontSize: '1rem',
  transition: 'all 0.2s ease-in-out',
  fontFamily: '"Inter", sans-serif',
};

const commonButtonStyles: SxProps<Theme> = {
  padding: '0.75rem 1.25rem',
  borderRadius: '0.5rem', // rounded-lg
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 600, // semibold
  transition: 'all 0.2s ease-in-out',
  border: '1px solid transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  fontFamily: '"Inter", sans-serif',
  whiteSpace: 'nowrap', // Prevent text wrap on buttons
  textTransform: 'none', // Prevent MUI default uppercase
};

export const addBlogStyles = {
  container: {
    maxWidth: '1200px',
    margin: { xs: '1rem', md: '2rem auto' },
    padding: { xs: '1rem', md: '1.5rem' },
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
  },
  header: {
    marginBottom: '1.5rem',
    color: '#1e293b',
    textAlign: 'center',
    fontSize: { xs: '1.75rem', md: '2.25rem' },
    fontWeight: 700,
  },
  subHeader: {
    marginBottom: '1.5rem',
    color: '#334155',
    fontSize: { xs: '1.5rem', md: '1.75rem' },
    fontWeight: 600,
  },
  formContainer: {
    padding: { xs: '1rem', md: '2rem' },
    borderRadius: '0.75rem',
    backgroundColor: '#f8fafc',
    marginBottom: '2rem',
  },
  inputField: {
    marginBottom: '1.5rem',
    '& .MuiOutlinedInput-root': {
      ...commonInputStyles,
      backgroundColor: '#ffffff',
      '& fieldset': {
        borderColor: '#e2e8f0',
      },
      '&:hover fieldset': {
        borderColor: '#94a3b8',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#007bff',
        borderWidth: '2px',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#64748b',
    },
    '& .MuiFormHelperText-root': {
      color: '#ef4444',
    },
  },
  imageUploadContainer: {
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  uploadButton: {
    ...commonButtonStyles,
    backgroundColor: '#e0f2fe',
    color: '#0288d1',
    border: '1px solid #90caf9',
    '&:hover': {
      backgroundColor: '#90caf9',
      color: '#ffffff',
    },
  },
  imagePreviewBox: {
    position: 'relative',
    width: '150px',
    height: '100px',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255,255,255,0.7)',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.9)',
    },
    minWidth: 0,
    padding: '4px',
  },
  submitButton: {
    ...commonButtonStyles,
    backgroundColor: '#10b981',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#059669',
    },
    '&:disabled': {
      backgroundColor: '#a7f3d0',
      color: '#ffffff',
      cursor: 'not-allowed',
    },
  },
  cancelEditButton: {
    ...commonButtonStyles,
    backgroundColor: 'transparent',
    color: '#64748b',
    border: '1px solid #cbd5e1',
    '&:hover': {
      backgroundColor: '#f1f5f9',
      borderColor: '#94a3b8',
    },
    marginLeft: '1rem',
  },
  alert: {
    marginBottom: '1rem',
    borderRadius: '0.5rem',
  },
  searchAndSwitchContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1.5rem',
    gap: '1rem',
    flexWrap: 'wrap',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
  searchField: {
    width: '300px',
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },
  viewToggle: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    '& .MuiToggleButton-root': {
      border: '1px solid #cbd5e1',
      color: '#475569',
      '&.Mui-selected': {
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        '&:hover': {
          backgroundColor: '#2563eb',
        },
      },
      '&:hover': {
        backgroundColor: '#f1f5f9',
      },
    },
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    paddingY: '2rem',
  },
  tableContainer: {
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    borderRadius: '0.75rem',
    overflow: 'hidden',
  },
  tableHeader: {
    fontWeight: 700,
    backgroundColor: '#f8fafc',
    color: '#334155',
    whiteSpace: 'nowrap',
    padding: '1rem',
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#fefefe',
    },
    '&:hover': {
      backgroundColor: '#f0f4f8',
    },
  },
  tableCell: {
    color: '#475569',
    padding: '0.75rem 1rem',
  },
  tableImage: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '4px',
    flexShrink: 0,
  },
  tableActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    '& .MuiIconButton-root': {
      padding: '6px',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
  },
  blogGrid: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(auto-fill, minmax(280px, 1fr))',
    },
    gap: '1.5rem',
    marginBottom: '1.5rem', // Added margin bottom for spacing before pagination
  },
  blogCard: {
    backgroundColor: '#ffffff',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    },
  },
  blogCardImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  blogCardContent: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  blogCardTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: '0.5rem',
  },
  blogCardDescription: {
    fontSize: '0.875rem',
    color: '#475569',
    marginBottom: '1rem',
    flexGrow: 1,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  blogCardActions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem',
    flexWrap: 'wrap',
    '& .MuiIconButton-root': {
      padding: '6px',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
  },
  // Renamed and adjusted for direct application to TablePagination
  paginationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '0.75rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  paginationButton: {
    ...commonButtonStyles,
    backgroundColor: '#ffffff',
    color: '#475569',
    border: '1px solid #cbd5e1',
    padding: '0.6rem 1rem',
    fontSize: '0.875rem',
    margin: '0 0.25rem',
  },
  pageNumber: {
    ...commonButtonStyles,
    backgroundColor: '#ffffff',
    color: '#475569',
    border: '1px solid #cbd5e1',
    minWidth: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    padding: 0,
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 0.25rem',
  },
  pageNumberActive: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    borderColor: '#3b82f6',
    '&:hover': {
      backgroundColor: '#2563eb',
    },
  },
};