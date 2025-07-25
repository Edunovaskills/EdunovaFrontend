// src/features/components/admin/AddCourse/styles.component.ts
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

export const addCourseStyles = {
  container: {
    maxWidth: '1200px',
    margin: { xs: '1rem', md: '2rem auto' }, // Responsive margin
    padding: { xs: '1rem', md: '1.5rem' }, // Responsive padding
    backgroundColor: '#ffffff', // white
    borderRadius: '1rem', // rounded-2xl
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)', // shadow-xl
  },
  header: {
    marginBottom: '1.5rem',
    color: '#1e293b', // slate-900
    textAlign: 'center',
    fontSize: { xs: '1.75rem', md: '2.25rem' }, // Responsive font size
    fontWeight: 700, // font-bold
  },
  subHeader: {
    marginBottom: '1.5rem',
    color: '#334155', // slate-700
    fontSize: { xs: '1.5rem', md: '1.75rem' }, // Responsive font size
    fontWeight: 600, // font-semibold
  },
  formContainer: {
    padding: { xs: '1rem', md: '2rem' },
    borderRadius: '0.75rem', // rounded-xl
    backgroundColor: '#f8fafc', // slate-50
    marginBottom: '2rem',
  },
  inputField: {
    marginBottom: '1.5rem',
    '& .MuiOutlinedInput-root': {
      // Apply common input styles directly
      ...commonInputStyles,
      backgroundColor: '#ffffff',
      '& fieldset': {
        borderColor: '#e2e8f0', // slate-200
      },
      '&:hover fieldset': {
        borderColor: '#94a3b8', // slate-400
      },
      '&.Mui-focused fieldset': {
        borderColor: '#007bff', // blue-500
        borderWidth: '2px',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#64748b', // slate-500
    },
    '& .MuiFormHelperText-root': {
      color: '#ef4444', // red-500
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
    backgroundColor: '#e0f2fe', // light blue
    color: '#0288d1', // darker blue
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
    minWidth: 0, // Ensure button size is minimal for icon
    padding: '4px', // Adjust padding
  },
  submitButton: {
    ...commonButtonStyles,
    backgroundColor: '#10b981', // emerald-500
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#059669', // emerald-600
    },
    '&:disabled': {
      backgroundColor: '#a7f3d0', // emerald-200
      color: '#ffffff', // Ensure text color is readable when disabled
      cursor: 'not-allowed',
    },
  },
  cancelEditButton: {
    ...commonButtonStyles,
    backgroundColor: 'transparent',
    color: '#64748b', // slate-500
    border: '1px solid #cbd5e1',
    '&:hover': {
      backgroundColor: '#f1f5f9', // slate-100
      borderColor: '#94a3b8',
    },
    marginLeft: '1rem',
  },
  alert: {
    marginBottom: '1rem',
    borderRadius: '0.5rem',
  },
  // Search and View Toggle Container
  searchAndSwitchContainer: {
    display: 'flex',
    justifyContent: 'flex-end', // Align to the right
    marginBottom: '1.5rem',
    gap: '1rem', // Space between search and button
    flexWrap: 'wrap', // Allow wrapping on small screens
    '@media (max-width: 600px)': {
      flexDirection: 'column', // Stack vertically on small screens
      alignItems: 'stretch', // Stretch items to full width
    },
  },
  searchField: {
    width: '300px',
    '@media (max-width: 600px)': {
      width: '100%', // Full width on small screens
    },
  },
  switchViewButton: {
    ...commonButtonStyles,
    backgroundColor: '#60a5fa', // blue-400
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#3b82f6', // blue-500
    },
    '@media (max-width: 600px)': {
      width: '100%',
      marginLeft: '0 !important', // Override default margin for consistency on small screens
    },
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    paddingY: '2rem',
  },
  // Table Styles
  tableContainer: {
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    borderRadius: '0.75rem',
    overflow: 'hidden', // Ensures rounded corners are applied to content
  },
  tableHeader: {
    fontWeight: 700,
    backgroundColor: '#f8fafc', // slate-50
    color: '#334155', // slate-700
    whiteSpace: 'nowrap',
    padding: '1rem', // Adjust padding for headers
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#fefefe', // very light gray
    },
    '&:hover': {
      backgroundColor: '#f0f4f8', // light blue-gray hover
    },
  },
  tableCell: {
    color: '#475569', // slate-600
    padding: '0.75rem 1rem', // Adjust padding for cells
  },
  tableImage: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '4px',
    flexShrink: 0, // Prevent image from shrinking if content is too wide
  },
  tableActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    '& .MuiIconButton-root': {
      padding: '6px', // Smaller padding for icons
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
  },
  // Grid View Styles
  courseGridContainer: {
    // This Box wraps the actual grid and the pagination
    marginBottom: '1rem', // Space between grid and pagination
  },
  courseGrid: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr', // Full width on extra small screens
      sm: 'repeat(auto-fill, minmax(280px, 1fr))', // Responsive columns
    },
    gap: '1.5rem',
  },
  courseCard: {
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
  courseCardImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  courseCardContent: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  courseCardTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: '0.5rem',
  },
  courseCardDescription: {
    fontSize: '0.875rem',
    color: '#475569',
    marginBottom: '1rem',
    flexGrow: 1,
    display: '-webkit-box',
    WebkitLineClamp: 3, // Limit description to 3 lines
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  courseCardActions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem',
    flexWrap: 'wrap', // Allow action buttons to wrap if needed
    '& .action-button': {
      ...commonButtonStyles,
      padding: '0.5rem 0.75rem',
      fontSize: '0.875rem',
      fontWeight: 500,
      flexGrow: 1,
      minWidth: 'unset', // Override minWidth from commonButtonStyles
      '& svg': {
        marginRight: '0.25rem',
      },
    },
    '& .edit-button': {
      backgroundColor: '#ffedd5', // orange-100
      color: '#f97316', // orange-500
      '&:hover': {
        backgroundColor: '#fed7aa', // orange-200
      },
    },
    '& .delete-button': {
      backgroundColor: '#fee2e2', // red-100
      color: '#ef4444', // red-500
      '&:hover': {
        backgroundColor: '#fecaca', // red-200
      },
    },
    '& .view-button': {
      backgroundColor: '#e0f7fa', // cyan-50
      color: '#00bcd4', // cyan-500
      '&:hover': {
        backgroundColor: '#b2ebf2', // cyan-100
      },
    },
  },
  paginationContainer: {
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
    backgroundColor: '#ffffff', // white
    color: '#475569', // slate-600
    border: '1px solid #cbd5e1', // slate-300
    padding: '0.6rem 1rem',
    fontSize: '0.875rem', // text-sm
    margin: '0 0.25rem', // Add margin for spacing between buttons
  },
  pageNumber: {
    ...commonButtonStyles,
    backgroundColor: '#ffffff', // white
    color: '#475569', // slate-600
    border: '1px solid #cbd5e1', // slate-300
    minWidth: '2.5rem', // fixed width for circles
    height: '2.5rem', // fixed height for circles
    borderRadius: '50%', // circle shape
    padding: 0,
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 0.25rem',
  },
  pageNumberActive: {
    backgroundColor: '#3b82f6', // blue-500
    color: '#ffffff',
    borderColor: '#3b82f6',
    '&:hover': {
      backgroundColor: '#2563eb', // blue-600
    },
  },
};
