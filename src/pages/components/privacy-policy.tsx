import React from 'react'
import { Container, Typography, Box } from '@mui/material'

const PrivacyPolicy = () => (
  <Container maxWidth="md" sx={{ py: 8 }}>
    <Typography variant="h4" gutterBottom>
      Privacy Policy
    </Typography>
    <Box sx={{ mt: 2 }}>
      <Typography variant="body1" paragraph>
        This is the Privacy Policy page. Here you can describe how user data is
        collected, used, and protected. (Replace this with your actual privacy
        policy.)
      </Typography>
      <Typography variant="body1" paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod,
        urna eu tincidunt consectetur, nisi nisl aliquam enim, eget facilisis
        quam felis id mauris.
      </Typography>
    </Box>
  </Container>
)

export default PrivacyPolicy
