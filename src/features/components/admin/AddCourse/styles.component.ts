// src/features/components/admin/AddCourse/styles.component.ts

import React from 'react';

// Define common CSS properties for reuse and consistency
const commonInputStyles: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem',
  border: '1px solid #cbd5e1', // slate-300
  borderRadius: '0.5rem', // rounded-lg
  fontSize: '1rem',
  transition: 'all 0.2s ease-in-out',
  fontFamily: '"Inter", sans-serif',
};

const commonButtonStyles: React.CSSProperties = {
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
};

export const addCourseStyles = {
  container: {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '1.5rem',
    backgroundColor: '#ffffff', // white
    borderRadius: '1rem', // rounded-2xl
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)', // shadow-xl
    fontFamily: '"Inter", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem', // gap-10
    color: '#334155', // slate-700 for text

    '&[data-theme="dark"]': {
      backgroundColor: '#1e293b', // slate-800
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
      color: '#e2e8f0', // slate-200
    },

    '@media (max-width: 768px)': {
      margin: '1rem',
      padding: '1rem',
      gap: '2rem',
    },
  },

  title: {
    fontSize: '1.875rem', // text-3xl
    fontWeight: 700, // bold
    textAlign: 'center',
    color: '#1e293b', // slate-900

    '&[data-theme="dark"]': {
      color: '#f8fafc', // slate-50
    },

    '@media (max-width: 768px)': {
      fontSize: '1.5rem', // text-2xl
    },
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem', // gap-6
  },

  row: {
    display: 'flex',
    gap: '1.5rem', // gap-6

    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '1rem', // gap-4
    },
  },

  field: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem', // gap-2
  },

  label: {
    fontSize: '0.9375rem', // ~15px
    fontWeight: 500, // medium
    color: '#475569', // slate-600

    '&[data-theme="dark"]': {
      color: '#cbd5e1', // slate-300
    },
  },

  input: {
    ...commonInputStyles,
    backgroundColor: '#f8fafc', // slate-50
    color: '#1e293b', // slate-900

    '&[data-theme="dark"]': {
      backgroundColor: '#334155', // slate-700
      borderColor: '#475569', // slate-600
      color: '#f8fafc', // slate-50
    },
  },

  textarea: {
    ...commonInputStyles,
    minHeight: '80px',
    resize: 'vertical',
    backgroundColor: '#f8fafc', // slate-50
    color: '#1e293b', // slate-900

    '&[data-theme="dark"]': {
      backgroundColor: '#334155', // slate-700
      borderColor: '#475569', // slate-600
      color: '#f8fafc', // slate-50
    },
  },

  select: {
    ...commonInputStyles,
    appearance: 'none', // Remove default arrow
    paddingRight: '2.5rem', // Make space for custom arrow
    backgroundColor: '#f8fafc', // slate-50
    color: '#1e293b', // slate-900
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.75rem center',
    backgroundSize: '1.25em',

    '&[data-theme="dark"]': {
      backgroundColor: '#334155', // slate-700
      borderColor: '#475569', // slate-600
      color: '#f8fafc', // slate-50
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23e2e8f0'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")`, // White arrow for dark mode
    },
  },

  submitButton: {
    ...commonButtonStyles,
    backgroundColor: '#4f46e5', // indigo-600
    color: '#ffffff', // white
    marginTop: '1rem',

    '&[data-theme="dark"]': {
      backgroundColor: '#6366f1', // indigo-500
      color: '#ffffff',
    },
  },

  imagePreviewContainer: {
    position: 'relative',
    width: '100%',
    height: '200px',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    border: '2px dashed #cbd5e1', // slate-300
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'border-color 0.2s ease-in-out',
    backgroundColor: '#f8fafc', // slate-50

    '&[data-theme="dark"]': {
      borderColor: '#475569', // slate-600
      backgroundColor: '#334155', // slate-700
    },
  },

  imagePreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  },

  removeButton: {
    ...commonButtonStyles,
    backgroundColor: '#dc2626', // red-600
    color: '#ffffff',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem', // text-sm
  },

  courseListSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginTop: '2.5rem',
  },

  viewToggleContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  },

  viewToggleButton: {
    ...commonButtonStyles,
    backgroundColor: '#f1f5f9', // slate-100
    color: '#475569', // slate-600
    border: '1px solid #cbd5e1', // slate-300
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',

    '&[data-theme="dark"]': {
      backgroundColor: '#334155', // slate-700
      color: '#cbd5e1', // slate-300
      borderColor: '#475569', // slate-600
    },
  },

  viewToggleButtonActive: {
    ...commonButtonStyles,
    backgroundColor: '#e0e7ff', // indigo-100
    color: '#4f46e5', // indigo-600
    border: '1px solid #a5b4fc', // indigo-300
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',

    '&[data-theme="dark"]': {
      backgroundColor: '#4338ca', // indigo-700
      color: '#ffffff',
      borderColor: '#6366f1', // indigo-500
    },
  },

  loading: {
    textAlign: 'center',
    fontSize: '1.25rem',
    color: '#475569', // slate-600

    '&[data-theme="dark"]': {
      color: '#cbd5e1', // slate-300
    },
  },

  empty: {
    textAlign: 'center',
    fontSize: '1.125rem',
    color: '#64748b', // slate-500
    padding: '2rem 0',
    border: '1px dashed #cbd5e1',
    borderRadius: '0.75rem',

    '&[data-theme="dark"]': {
      color: '#94a3b8', // slate-400
      borderColor: '#475569', // slate-600
    },
  },

  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 0.5rem', // Adds space between rows
    textAlign: 'left',
    color: '#334155', // slate-700

    '&[data-theme="dark"]': {
      color: '#e2e8f0', // slate-200
    },

    '@media (max-width: 768px)': {
      display: 'block',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      WebkitOverflowScrolling: 'touch', // Enable smooth scrolling on iOS
      '& thead': { display: 'none' }, // Hide table header on small screens
      '& tbody': { display: 'block', width: '100%' },
      '& tr': {
        display: 'block',
        marginBottom: '1rem',
        border: '1px solid #e2e8f0',
        borderRadius: '0.75rem',
        padding: '1rem',
        '&[data-theme="dark"]': {
          borderColor: '#475569',
        },
      },
      '& td': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 0',
        borderBottom: '1px solid #e2e8f0',
        '&:last-child': { borderBottom: 'none' },
        '&[data-theme="dark"]': {
          borderColor: '#475569',
        },
        '&::before': { // For mobile, show column header
          content: 'attr(data-label)',
          fontWeight: 'bold',
          color: '#64748b',
          marginRight: '1rem',
          '&[data-theme="dark"]': {
            color: '#94a3b8',
          },
        },
      },
    },
  },

  th: {
    padding: '1rem 0.75rem',
    backgroundColor: '#f1f5f9', // slate-100
    fontWeight: 600,
    fontSize: '0.875rem', // text-sm
    textTransform: 'uppercase',
    letterSpacing: '0.05em', // tracking-wider
    borderRadius: '0.5rem 0.5rem 0 0', // Rounded corners for table header

    '&[data-theme="dark"]': {
      backgroundColor: '#334155', // slate-700
      color: '#cbd5e1', // slate-300
    },
  },

  td: {
    padding: '1rem 0.75rem',
    backgroundColor: '#ffffff', // white
    fontSize: '0.9375rem',

    '&[data-theme="dark"]': {
      backgroundColor: '#1e293b', // slate-800
      color: '#e2e8f0', // slate-200
    },

    // Apply specific border-radius to the first and last child of the first and last row
    '&:first-of-type': {
      borderTopLeftRadius: '0.5rem',
      borderBottomLeftRadius: '0.5rem',
    },
    '&:last-of-type': {
      borderTopRightRadius: '0.5rem',
      borderBottomRightRadius: '0.5rem',
    },
  },

  tr: {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', // subtle shadow for rows
    borderRadius: '0.5rem',
    marginBottom: '0.5rem',
    overflow: 'hidden', // Ensures inner content respects border-radius

    '&[data-theme="dark"]': {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    },

    // First and last row special handling for overall table border-radius effect
    '&:first-of-type > td:first-of-type': { borderTopLeftRadius: '0.5rem' },
    '&:first-of-type > td:last-of-type': { borderTopRightRadius: '0.5rem' },
    '&:last-of-type > td:first-of-type': { borderBottomLeftRadius: '0.5rem' },
    '&:last-of-type > td:last-of-type': { borderBottomRightRadius: '0.5rem' },
  },

  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem', // gap-6
    padding: '0.5rem',

    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr', // Single column on small screens
      gap: '1.25rem',
      padding: '0',
    },
  },

  courseCard: {
    backgroundColor: '#ffffff', // white
    borderRadius: '1rem', // rounded-xl
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)', // shadow-lg
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    border: '1px solid #e2e8f0', // slate-200

    '&[data-theme="dark"]': {
      backgroundColor: '#1e293b', // slate-800
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
      borderColor: '#334155', // slate-700
    },
  },

  cardImageWrapper: {
    width: '100%',
    height: '180px',
    overflow: 'hidden',
    borderBottom: '1px solid #e2e8f0',

    '&[data-theme="dark"]': {
      borderColor: '#334155',
    },
  },

  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  cardContent: {
    padding: '1rem 1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    flexGrow: 1,
  },

  cardTitle: {
    fontSize: '1.25rem', // text-xl
    fontWeight: 700, // bold
    color: '#1e293b', // slate-900

    '&[data-theme="dark"]': {
      color: '#f8fafc', // slate-50
    },
  },

  cardDetail: {
    fontSize: '0.9375rem',
    color: '#475569', // slate-600
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',

    '&[data-theme="dark"]': {
      color: '#cbd5e1', // slate-300
    },

    '& svg': {
      width: '1rem',
      height: '1rem',
      strokeWidth: '2px',
      color: '#64748b',

      '&[data-theme="dark"]': {
        color: '#94a3b8',
      },
    },
  },

  instructorAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid #cbd5e1', // Light border
    '&[data-theme="dark"]': {
      borderColor: '#475569', // Darker border in dark mode
    },
  },

  cardDescription: {
    fontSize: '0.875rem', // text-sm
    color: '#64748b', // slate-500
    lineHeight: '1.5',
    marginBottom: '0.5rem',
    flexGrow: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3, // Limit to 3 lines
    WebkitBoxOrient: 'vertical',

    '&[data-theme="dark"]': {
      color: '#94a3b8', // slate-400
    },
  },

  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto', // Push to bottom
    paddingTop: '1rem',
    borderTop: '1px solid #e2e8f0', // slate-200
    fontSize: '1rem',
    fontWeight: 600,
    color: '#1e293b', // slate-900

    '&[data-theme="dark"]': {
      borderColor: '#334155', // slate-700
      color: '#f8fafc', // slate-50
    },
  },

  cardLink: {
    color: '#4f46e5', // indigo-600
    textDecoration: 'none',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    transition: 'color 0.2s ease-in-out',

    '&[data-theme="dark"]': {
      color: '#6366f1', // indigo-500
    },

    '& svg': {
      transition: 'stroke 0.2s ease-in-out',
      stroke: '#4f46e5',

      '&[data-theme="dark"]': {
        stroke: '#6366f1',
      },
    },
  },

  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '2rem',
    padding: '0.5rem',
    borderRadius: '0.75rem',
    backgroundColor: '#f1f5f9', // slate-100
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',

    '&[data-theme="dark"]': {
      backgroundColor: '#334155', // slate-700
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    },

    '@media (max-width: 768px)': {
      flexWrap: 'wrap',
      gap: '0.75rem',
    },
  },

  paginationButton: {
    ...commonButtonStyles,
    backgroundColor: '#ffffff', // white
    color: '#475569', // slate-600
    border: '1px solid #cbd5e1', // slate-300
    padding: '0.6rem 1rem',
    fontSize: '0.875rem', // text-sm

    '&[data-theme="dark"]': {
      backgroundColor: '#1e293b', // slate-800
      color: '#cbd5e1', // slate-300
      borderColor: '#475569', // slate-600
    },
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

    '&[data-theme="dark"]': {
      backgroundColor: '#1e293b', // slate-800
      color: '#cbd5e1', // slate-300
      borderColor: '#475569', // slate-600
    },
  },

  pageNumberActive: {
    ...commonButtonStyles,
    backgroundColor: '#4f46e5', // indigo-600
    color: '#ffffff', // white
    border: '1px solid #4f46e5',
    minWidth: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    padding: 0,
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&[data-theme="dark"]': {
      backgroundColor: '#6366f1', // indigo-500
      color: '#ffffff',
      borderColor: '#6366f1',
    },
  },
};
