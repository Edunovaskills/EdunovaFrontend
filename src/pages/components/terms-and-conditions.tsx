import React from 'react'
import { Container, Typography, Box } from '@mui/material'

const TermsAndConditions = () => (
  <Container maxWidth="md" sx={{ py: 8 }}>
    <Typography variant="h4" gutterBottom>
      Terms & Conditions
    </Typography>
    <Box sx={{ mt: 2 }}>
      <Typography variant="body1" paragraph>
        This is the Terms & Conditions page. Here you can outline the rules and
        guidelines for using your website. (Replace this with your actual terms
        and conditions.)
      </Typography>
      <Typography variant="body1" paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod,
        urna eu tincidunt consectetur, nisi nisl aliquam enim, eget facilisis
        quam felis id mauris.
      </Typography>
    </Box>
  </Container>
)

export default TermsAndConditions
