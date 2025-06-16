// src/features/components/admin/AddEvent/styles.component.ts

import React from 'react';

export const addEventStyles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    maxWidth: '1200px',
    margin: '2rem auto',
    backgroundColor: '#ffffff', // Default light mode background
    transition: 'background-color 0.3s ease-in-out',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    color: '#1e293b',
    textAlign: 'center',
    fontWeight: '700',
    textShadow: '1px 1px 2px rgba(0,0,0,0.05)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.8rem',
  },
  row: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  field: {
    flex: '1 1 calc(50% - 0.75rem)',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '280px',
  },
  label: {
    marginBottom: '0.05rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#475569',
  },
  input: {
    padding: '0.9rem',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '1rem',
    backgroundColor: '#f8fafc',
    color: '#334155',
    boxSizing: 'border-box',
    width: '100%',
    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    // These pseudo-class styles are for conceptual reference and won't work with pure inline styles
    // '&:focus': {
    //   borderColor: '#3b82f6',
    //   boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
    //   outline: 'none',
    // },
  },
  textarea: {
    padding: '0.9rem',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '1rem',
    backgroundColor: '#f8fafc',
    color: '#334155',
    resize: 'vertical',
    minHeight: '100px',
    boxSizing: 'border-box',
    width: '100%',
    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    // '&:focus': {
    //   borderColor: '#3b82f6',
    //   boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
    //   outline: 'none',
    // },
  },
  select: {
    padding: '0.9rem',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '1rem',
    backgroundColor: '#f8fafc',
    color: '#334155',
    boxSizing: 'border-box',
    width: '100%',
    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    // '&:focus': {
    //   borderColor: '#3b82f6',
    //   boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
    //   outline: 'none',
    // },
  },
  fileInput: {
    display: 'none',
  },
  uploadArea: {
    border: '2px dashed #94a3b8',
    borderRadius: '10px',
    padding: '2.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#f1f5f9',
    transition: 'all 0.3s ease-in-out',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '1rem',
    minHeight: '180px',
  },
  uploadAreaActive: { // This can be applied via conditional styling in React
    borderColor: '#3b82f6',
    backgroundColor: '#e0edff',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',
  },
  uploadLabel: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.8rem',
  },
  uploadIcon: {
    fontSize: '3.5rem',
    color: '#64748b',
  },
  uploadText: {
    color: '#64748b',
  },
  uploadMainText: {
    margin: 0,
    fontWeight: '700',
    fontSize: '1.1rem',
  },
  uploadSubText: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#7f8c9b',
  },
  imagePreviewContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '350px',
    height: '220px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    margin: '0.5rem auto',
    transition: 'transform 0.2s ease-in-out',
    // '&:hover': { transform: 'scale(1.02)' }, // Won't work inline
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.3s ease-in-out',
    // '&:hover': { transform: 'scale(1.05)' }, // Won't work inline
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    opacity: 0, // Initial opacity
    transition: 'opacity 0.3s ease-in-out',
    // '&:hover': { opacity: 1 }, // Won't work inline. Handled in component with JS.
  },
  removeButton: {
    background: '#dc2626',
    color: '#ffffff',
    border: 'none',
    padding: '0.7rem 1.2rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'background-color 0.2s ease-in-out',
    // '&:hover': { backgroundColor: '#b91c1c' }, // Won't work inline
  },
  replaceButton: {
    background: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '0.7rem 1.2rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    textAlign: 'center',
    display: 'inline-block',
    transition: 'background-color 0.2s ease-in-out',
    // '&:hover': { backgroundColor: '#1d4ed8' }, // Won't work inline
  },
  submitButton: {
    backgroundColor: '#16a34a',
    color: '#ffffff',
    padding: '1.2rem 2rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '2rem',
    transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out',
    // '&:hover': { backgroundColor: '#15803d', transform: 'translateY(-2px)' }, // Won't work inline
    // '&:disabled': { backgroundColor: '#94a3b8', cursor: 'not-allowed', transform: 'none' }, // Conditional style in React
  },

  // --- Styles for the Event List ---
  eventListSection: {
    marginTop: '4rem',
    paddingTop: '2.5rem',
    borderTop: '1px solid #e2e8f0',
  },
  viewToggleContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1.5rem',
    gap: '0.5rem',
  },
  viewToggleButton: {
    background: 'none',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    padding: '0.6rem 1rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#475569',
    transition: 'all 0.2s ease-in-out',
    // '&:hover': { backgroundColor: '#e2e8f0' }, // Won't work inline
  },
  viewToggleButtonActive: { // Applied conditionally
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
    color: '#ffffff',
    // '&:hover': { backgroundColor: '#2563eb' }, // Won't work inline
  },

  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    marginTop: '1.5rem',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
  th: {
    background: '#f1f5f9',
    padding: '1.2rem 1rem',
    textAlign: 'left',
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#475569',
    borderBottom: '1px solid #e2e8f0',
  },
  td: {
    padding: '1rem',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '0.9rem',
    color: '#334155',
    verticalAlign: 'middle',
    backgroundColor: '#ffffff',
  },
  // 'tr:last-child td': { borderBottom: 'none' }, // Won't work inline
  thumbnail: {
    width: '45px',
    height: '45px',
    objectFit: 'cover',
    borderRadius: '50%',
    marginRight: '0.8rem',
    verticalAlign: 'middle',
    border: '1px solid #e2e8f0',
  },

  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
    padding: '1rem',
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    cursor: 'pointer',
    // '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)' }, // Won't work inline
  },
  cardImageWrapper: {
    width: '100%',
    height: '180px',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f0f4f8',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.3s ease-in-out',
    // '&:hover': { transform: 'scale(1.05)' }, // Won't work inline
  },
  cardContent: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  cardTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.75rem',
    lineHeight: '1.3',
  },
  cardDetail: {
    fontSize: '0.9rem',
    color: '#475569',
    marginBottom: '0.4rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  cardDescription: {
    fontSize: '0.9rem',
    color: '#64748b',
    lineHeight: '1.5',
    marginBottom: '1rem',
    flexGrow: 1,
  },
  cardFooter: {
    marginTop: 'auto',
    paddingTop: '1rem',
    borderTop: '1px solid #f1f5f9',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.85rem',
    color: '#64748b',
  },
  cardLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '600',
    // '&:hover': { textDecoration: 'underline' }, // Won't work inline
  },

  // New Pagination Styles
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // Align items vertically
    gap: '0.8rem', // Adjusted gap for numbers
    marginTop: '2rem',
  },
  paginationButton: {
    backgroundColor: '#60a5fa', // A slightly softer blue
    color: '#ffffff',
    padding: '0.75rem 1.4rem', // More generous padding
    borderRadius: '8px', // More rounded buttons
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
    // '&:hover': { backgroundColor: '#3b82f6', transform: 'translateY(-2px)' }, // Won't work inline
    // '&:disabled': { backgroundColor: '#94a3b8', cursor: 'not-allowed', boxShadow: 'none', transform: 'none' }, // Conditional style in React
  },
  pageNumberContainer: {
    display: 'flex',
    gap: '0.5rem',
    margin: '0 1rem', // Space between buttons and numbers
  },
  pageNumber: {
    minWidth: '40px', // Fixed width for number circles
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%', // Circle shape
    border: '1px solid #cbd5e1',
    color: '#475569',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    // '&:hover': { backgroundColor: '#f1f5f9' }, // Won't work inline
  },
  pageNumberActive: { // Applied conditionally
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
    color: '#ffffff',
    // '&:hover': { backgroundColor: '#2563eb' }, // Won't work inline
  },

  // Responsive adjustments
  '@media (max-width: 768px)': {
    container: {
      padding: '1.5rem',
      margin: '1rem auto',
    },
    title: {
      fontSize: '2rem',
    },
    row: {
      flexDirection: 'column',
      gap: '1rem',
    },
    field: {
      flex: '1 1 100%',
      minWidth: 'unset',
    },
    gridContainer: {
      gridTemplateColumns: '1fr',
    },
    uploadArea: {
      padding: '1.5rem',
      minHeight: '150px',
    },
    imagePreviewContainer: {
      maxWidth: '100%',
      height: '180px',
    },
    pagination: {
      flexWrap: 'wrap', // Allow pagination to wrap
      justifyContent: 'center',
      gap: '0.5rem',
    },
    paginationButton: {
      padding: '0.6rem 1rem',
      fontSize: '0.9rem',
    },
    pageNumber: {
      minWidth: '35px',
      height: '35px',
      fontSize: '0.8rem',
    },
  },
};