export const userStyles = {
  tableContainer: {
    overflowX: 'auto' as const,
    padding: '24px', // Increased for more breathing room
    backgroundColor: '#ffffff',
    borderRadius: '12px', // Softer corners
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', // Subtle, modern shadow
    marginBottom: '24px', // More space for pagination
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '15px', // Slightly larger for readability
    color: '#1f2a44', // Darker, professional blue-gray
  },
  th: {
    padding: '16px 20px', // More padding for headers
    textAlign: 'left' as const,
    backgroundColor: '#f8fafc', // Clean, light background
    borderBottom: '2px solid #e2e8f0', // Subtle gray
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.6px',
    color: '#334155', // Slate gray for contrast
  },
  td: {
    padding: '16px 20px', // Match th padding
    borderBottom: '1px solid #edf2f7', // Very light border
    verticalAlign: 'middle' as const,
    color: '#1f2a44',
  },
  tr: {
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#f1f5f9', // Soft slate hover
    },
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px', // More spacing for clarity
    padding: '20px 0', // Increased padding
    fontSize: '15px', // Slightly larger for readability
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif', // Modern, clean font
    color: '#1e293b', // Dark slate for text
  },
  paginationButton: {
    padding: '10px 20px', // Larger touch target
    border: '1px solid #e2e8f0', // Light gray border
    borderRadius: '8px', // Softer corners
    background: 'linear-gradient(180deg, #ffffff, #f8fafc)', // Subtle gradient
    color: '#3b82f6', // Vibrant blue for text
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '15px',
    lineHeight: '1.5',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', // Micro shadow for depth
    '&:hover': {
      background: 'linear-gradient(180deg, #f8fafc, #eff6ff)', // Light blue gradient on hover
      borderColor: '#3b82f6', // Blue border
      boxShadow: '0 2px 6px rgba(59, 130, 246, 0.2)', // Blue-tinted shadow
      transform: 'translateY(-1px)', // Slight lift effect
    },
    '&:active': {
      transform: 'translateY(0)', // Reset lift on click
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    },
    '&:disabled': {
      color: '#94a3b8', // Muted slate for disabled
      borderColor: '#e2e8f0',
      background: '#f8fafc',
      cursor: 'not-allowed',
      boxShadow: 'none',
      transform: 'none',
    },
    '&:focus': {
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)', // Accessible focus ring
      borderColor: '#3b82f6',
    },
  },
  paginationInfo: {
    fontWeight: '500',
    color: '#1e293b', // Dark slate for emphasis
    fontSize: '15px',
    letterSpacing: '0.2px',
    padding: '0 12px', // Slight padding for balance
  },
};