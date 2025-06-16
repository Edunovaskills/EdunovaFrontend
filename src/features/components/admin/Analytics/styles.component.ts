// styles.component.ts
export const analyticsStyles = {
  dashboardContainer: {
    padding: '30px', // More padding for the overall dashboard
    backgroundColor: '#f9fbfd', // Very light background for the dashboard area
    minHeight: 'calc(100vh - 60px)', // Adjust based on your header/footer
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center', // Center content horizontally
    fontFamily: 'Inter, sans-serif', // Assuming Inter or a similar modern font is available
  },
  header: {
    fontSize: '2.2em', // Slightly larger and more impactful header
    color: '#2c3e50', // Darker, more professional color
    marginBottom: '30px', // More space below the header
    fontWeight: '700' as 'bold',
    textAlign: 'center' as 'center',
  },
  chartContainer: {
    width: '90%', // Occupy more width of the parent container
    maxWidth: '1000px', // Max width for larger screens
    padding: '30px', // Increased padding inside the chart card
    backgroundColor: '#fff',
    borderRadius: '12px', // More rounded corners
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)', // Softer, more pronounced shadow
    border: '1px solid #e0e0e0', // Subtle border
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px', // Ensure a minimum height for the chart area
  },
  placeholder: {
    fontSize: '1.2em',
    color: '#555',
    textAlign: 'center' as 'center',
    padding: '50px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    margin: '50px auto',
    maxWidth: '500px',
  },
};