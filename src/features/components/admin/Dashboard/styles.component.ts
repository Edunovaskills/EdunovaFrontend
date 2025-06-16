export const dashboardStyles = {
  container: {
    padding: '2rem'
  },
  title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#2d3748',
      marginBottom: '2rem',
      textAlign: 'center'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '3rem'
    },
    statCard: {
      background: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer'
    },
    statIcon: {
      fontSize: '2.5rem'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#2d3748',
      margin: 0
    },
    statTitle: {
      fontSize: '0.9rem',
      color: '#718096',
      margin: '0.25rem 0 0 0',
      fontWeight: '500'
    },
  activitySection: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '1.5rem'
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    borderRadius: '8px',
    background: '#f7fafc',
    border: '1px solid #e2e8f0'
  },
  activityIcon: {
    fontSize: '1.5rem',
    background: 'white',
    padding: '0.5rem',
    borderRadius: '50%',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  activityContent: {
    flex: 1
  },
  activityAction: {
    margin: 0,
    fontWeight: '500',
    color: '#2d3748'
  },
  activityTime: {
    fontSize: '0.85rem',
    color: '#718096'
  }
};