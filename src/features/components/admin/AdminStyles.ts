export const adminStyles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '2rem'
  },
  content: {
    maxWidth: '100%',
    margin: '0 auto'
  },
  placeholder: {
    background: 'white',
    borderRadius: '12px',
    padding: '3rem',
    textAlign: 'center' as const,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    fontSize: '1.2rem',
    color: '#718096'
  },
   loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#e9eff4',
    padding: '20px',
  },
  loginTitle: {
    fontSize: '2.5em',
    marginBottom: '30px',
    color: '#333',
    fontWeight: 'bold',
  },
};