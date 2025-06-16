// src/features/components/admin/AddCourse/styles.component.ts

import { CSSProperties } from 'react';

// Define a type for your style objects to leverage TypeScript's type checking
// This helps ensure you're using valid CSS properties, while still allowing the '&' syntax
type StyleObject = CSSProperties & {
  '&[data-theme="dark"]'?: CSSProperties;
  '&:hover'?: CSSProperties;
  '&:focus'?: CSSProperties;
  '&:disabled'?: CSSProperties;
  [key: string]: any; // Allow for other keys like media queries, or nested pseudo-classes for structure
};

export const addCourseStyles: { [key: string]: StyleObject } = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f8fafc', // slate-50
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    '&[data-theme="dark"]': {
      backgroundColor: '#1e293b', // slate-900
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    },
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#1e293b', // slate-900
    textAlign: 'center',
    '&[data-theme="dark"]': {
      color: '#f8fafc', // slate-50
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1.5rem',
    backgroundColor: '#ffffff', // white
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
    marginBottom: '2rem',
    '&[data-theme="dark"]': {
      backgroundColor: '#334155', // slate-700
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    },
  },
  row: {
    display: 'flex',
    gap: '1rem',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
  field: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem', // Added margin-bottom for consistent spacing
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#334155', // slate-700
    '&[data-theme="dark"]': {
      color: '#cbd5e1', // slate-300
    },
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #cbd5e1', // slate-300
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: '#f8fafc', // slate-50
    color: '#1e293b', // slate-900
    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:focus': { // Will not work as inline style
      outline: 'none',
      borderColor: '#4f46e5', // indigo-600
      boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.2)',
    },
    '&[data-theme="dark"]': {
      backgroundColor: '#334155', // slate-700
      borderColor: '#475569', // slate-600
      color: '#f1f5f9', // slate-50
      '&:focus': { // Will not work as inline style
        borderColor: '#818cf8', // indigo-400
        boxShadow: '0 0 0 3px rgba(129, 140, 248, 0.2)',
      },
    },
  },
  textarea: {
    padding: '0.75rem',
    border: '1px solid #cbd5e1', // slate-300
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: '#f8fafc', // slate-50
    color: '#1e293b', // slate-900
    resize: 'vertical',
    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:focus': { // Will not work as inline style
      outline: 'none',
      borderColor: '#4f46e5', // indigo-600
      boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.2)',
    },
    '&[data-theme="dark"]': {
      backgroundColor: '#334155', // slate-700
      borderColor: '#475569', // slate-600
      color: '#f1f5f9', // slate-50
      '&:focus': { // Will not work as inline style
        borderColor: '#818cf8', // indigo-400
        boxShadow: '0 0 0 3px rgba(129, 140, 248, 0.2)',
      },
    },
  },
  select: {
    padding: '0.75rem',
    border: '1px solid #cbd5e1', // slate-300
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: '#f8fafc', // slate-50
    color: '#1e293b', // slate-900
    cursor: 'pointer',
    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:focus': { // Will not work as inline style
      outline: 'none',
      borderColor: '#4f46e5', // indigo-600
      boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.2)',
    },
    '&[data-theme="dark"]': {
      backgroundColor: '#334155', // slate-700
      borderColor: '#475569', // slate-600
      color: '#f1f5f9', // slate-50
      '&:focus': { // Will not work as inline style
        borderColor: '#818cf8', // indigo-400
        boxShadow: '0 0 0 3px rgba(129, 140, 248, 0.2)',
      },
    },
  },
  submitButton: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#4f46e5', // indigo-600
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out, opacity 0.2s ease-in-out',
    '&:hover': { // Will not work as inline style
      backgroundColor: '#4338ca', // indigo-700
    },
    '&:disabled': { // Will not work as inline style
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    '&[data-theme="dark"]': {
      backgroundColor: '#6366f1', // indigo-500
      '&:hover': { // Will not work as inline style
        backgroundColor: '#4f46e5', // indigo-600
      },
    },
  },

  // Image Upload Styles - Crucial for fixing the issue
  imagePreviewContainer: {
    position: 'relative', // Absolutely essential for positioning the overlay
    width: '100%',
    maxWidth: '400px', // Max width for the container
    height: '200px', // Fixed height for consistent preview size
    overflow: 'hidden', // Hide parts of image that exceed container
    borderRadius: '8px',
    backgroundColor: '#e2e8f0', // slate-200, provides a background if image isn't full size
    display: 'flex', // Use flex to center the image within the container
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px dashed #94a3b8', // slate-400 for a dashed border
    cursor: 'pointer',
    transition: 'border-color 0.2s ease-in-out',
    '&[data-theme="dark"]': {
      backgroundColor: '#475569', // slate-600
      borderColor: '#64748b', // slate-500
    },
    '&:hover': { // Will not work as inline style
      borderColor: '#4f46e5', // indigo-600 on hover
    }
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // This is key to making the image fill the container without distortion
    borderRadius: '8px', // Match container's border radius
    display: 'block', // Ensures no extra space below the image
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent dark overlay
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    // opacity: 0, // Opacity is controlled by React state
    pointerEvents: 'none', // Allow clicks to pass through by default
    transition: 'opacity 0.3s ease-in-out',
  },
  removeButton: {
    backgroundColor: '#dc2626', // red-600
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 15px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    // opacity: 1, // Opacity is effectively controlled by imageOverlay's opacity
    pointerEvents: 'auto', // Make the button clickable when visible
    '&:hover': { // Will not work as inline style
      backgroundColor: '#b91c1c', // red-700
    },
  },

  // Course List Section Styles
  courseListSection: {
    paddingTop: '2rem',
  },
  viewToggleContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '1.5rem',
    justifyContent: 'center',
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  viewToggleButton: {
    padding: '10px 15px',
    border: '1px solid #cbd5e1', // slate-300
    borderRadius: '8px',
    backgroundColor: '#f1f5f9', // slate-100
    color: '#334155', // slate-700
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { // Will not work as inline style
      backgroundColor: '#e2e8f0', // slate-200
      borderColor: '#94a3b8', // slate-400
    },
    '&[data-theme="dark"]': {
      backgroundColor: '#475569', // slate-600
      borderColor: '#64748b', // slate-500
      color: '#f1f5f9', // slate-50
      '&:hover': { // Will not work as inline style
        backgroundColor: '#64748b', // slate-500
      },
    },
  },
  viewToggleButtonActive: {
    padding: '10px 15px',
    border: '1px solid #4f46e5', // indigo-600
    borderRadius: '8px',
    backgroundColor: '#4f46e5', // indigo-600
    color: '#ffffff',
    cursor: 'default',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '&[data-theme="dark"]': {
      backgroundColor: '#6366f1', // indigo-500
      borderColor: '#6366f1', // indigo-500
    },
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as 'collapse',
    marginBottom: '1rem',
  },
  th: {
    padding: '12px 15px',
    textAlign: 'left',
    backgroundColor: '#e2e8f0', // slate-200
    color: '#1e293b', // slate-900
    borderBottom: '2px solid #cbd5e1', // slate-300
    '&[data-theme="dark"]': {
      backgroundColor: '#475569', // slate-600
      color: '#f8fafc', // slate-50
      borderBottom: '2px solid #64748b', // slate-500
    },
  },
  tr: {
    transition: 'background-color 0.2s ease-in-out',
    '&:nth-of-type(even)': {
      backgroundColor: '#f1f5f9', // slate-100
    },
    '&:hover': { // Will not work as inline style
      backgroundColor: '#e2e8f0', // slate-200
    },
    '&[data-theme="dark"]': {
      '&:nth-of-type(even)': {
        backgroundColor: '#334155', // slate-700
      },
      '&:hover': { // Will not work as inline style
        backgroundColor: '#475569', // slate-600
      },
    },
  },
  td: {
    padding: '12px 15px',
    borderBottom: '1px solid #e2e8f0', // slate-200
    color: '#334155', // slate-700
    '&[data-theme="dark"]': {
      borderBottom: '1px solid #475569', // slate-600
      color: '#cbd5e1', // slate-300
    },
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '1rem',
  },
  courseCard: {
    backgroundColor: '#ffffff', // white
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    display: 'flex', // Make it a flex container
    flexDirection: 'column', // Stack children vertically
    '&:hover': { // Will not work as inline style
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
    },
    '&[data-theme="dark"]': {
      backgroundColor: '#334155', // slate-700
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      '&:hover': { // Will not work as inline style
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  cardImageWrapper: {
    width: '100%',
    height: '180px',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flexGrow: '1', // Allow content to grow and take available space
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b', // slate-900
    marginBottom: '5px',
    '&[data-theme="dark"]': {
      color: '#f8fafc', // slate-50
    },
  },
  cardDetail: {
    fontSize: '0.9rem',
    color: '#475569', // slate-600
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    '& svg': {
      width: '16px',
      height: '16px',
      stroke: '#64748b', // slate-500
    },
    '&[data-theme="dark"]': {
      color: '#94a3b8', // slate-400
      '& svg': {
        stroke: '#aabccf', // slightly lighter for dark theme
      },
    },
  },
  instructorAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '5px',
  },
  cardDescription: {
    fontSize: '0.85rem',
    color: '#64748b', // slate-500
    flexGrow: '1', // Allow description to grow but respect max-height
    maxHeight: '4.2em', // Approximately 3 lines of text
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.4em',
    '&[data-theme="dark"]': {
      color: '#cbd5e1', // slate-300
    },
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto', // Pushes the footer to the bottom
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b', // slate-900
    '&[data-theme="dark"]': {
      color: '#f8fafc', // slate-50
    },
  },
  cardLink: {
    color: '#4f46e5', // indigo-600
    textDecoration: 'none',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    transition: 'color 0.2s ease-in-out',
    '&:hover': { // Will not work as inline style
      color: '#4338ca', // indigo-700
    },
    '& svg': {
      width: '14px',
      height: '14px',
      stroke: '#4f46e5', // indigo-600
      transition: 'stroke 0.2s ease-in-out',
    },
    '&:hover svg': { // Will not work as inline style
      stroke: '#4338ca', // indigo-700
    },
    '&[data-theme="dark"]': {
      color: '#6366f1', // indigo-500
      '& svg': {
        stroke: '#6366f1', // indigo-500
      },
      '&:hover': { // Will not work as inline style
        color: '#818cf8', // indigo-400
        '& svg': {
          stroke: '#818cf8', // indigo-400
        },
      },
    },
  },

  // Pagination Styles
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f1f5f9', // slate-100
    borderRadius: '8px',
    '&[data-theme="dark"]': {
      backgroundColor: '#334155', // slate-700
    },
  },
  paginationButton: {
    padding: '8px 15px',
    border: '1px solid #cbd5e1', // slate-300
    borderRadius: '6px',
    backgroundColor: '#ffffff', // white
    color: '#334155', // slate-700
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { // Will not work as inline style
      backgroundColor: '#e2e8f0', // slate-200
      borderColor: '#94a3b8', // slate-400
    },
    '&:disabled': { // Will not work as inline style
      opacity: 0.5,
      cursor: 'not-allowed',
      backgroundColor: '#f1f5f9', // slate-100
    },
    '&[data-theme="dark"]': {
      backgroundColor: '#475569', // slate-600
      borderColor: '#64748b', // slate-500
      color: '#f1f5f9', // slate-50
      '&:hover': { // Will not work as inline style
        backgroundColor: '#64748b', // slate-500
      },
      '&:disabled': { // Will not work as inline style
        backgroundColor: '#3b5470', // darker slate for disabled
      },
    },
  },
  pageNumber: {
    padding: '8px 12px',
    border: '1px solid #cbd5e1', // slate-300
    borderRadius: '6px',
    color: '#475569', // slate-600
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { // Will not work as inline style
      backgroundColor: '#e2e8f0', // slate-200
      borderColor: '#94a3b8', // slate-400
    },
    '&[data-theme="dark"]': {
      borderColor: '#64748b', // slate-500
      color: '#94a3b8', // slate-400
      '&:hover': { // Will not work as inline style
        backgroundColor: '#64748b', // slate-500
      },
    },
  },
  pageNumberActive: {
    padding: '8px 12px',
    border: '1px solid #4f46e5', // indigo-600
    borderRadius: '6px',
    backgroundColor: '#4f46e5', // indigo-600
    color: '#ffffff',
    fontWeight: '600',
    cursor: 'default',
    '&[data-theme="dark"]': {
      backgroundColor: '#6366f1', // indigo-500
      borderColor: '#6366f1', // indigo-500
    },
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '1.1rem',
    color: '#475569', // slate-600
    '&[data-theme="dark"]': {
      color: '#94a3b8', // slate-400
    },
  },
  empty: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '1.1rem',
    color: '#475569', // slate-600
    '&[data-theme="dark"]': {
      color: '#94a3b8', // slate-400
    },
  },
};