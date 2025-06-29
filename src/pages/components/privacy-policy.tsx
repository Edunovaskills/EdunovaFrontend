import React from 'react'
import { Container, Typography, Box, Divider } from '@mui/material'

const sections = [
  {
    title: '1. Information We Collect',
    content: `Personal Information:\nWhen you register for courses, subscribe to newsletters, create an account, or interact with Edunova, we may collect information such as your name, email address, phone number, postal address, payment details, and other relevant personal data.\n\nTechnical and Usage Information:\nWe automatically gather technical details about your device and interactions with our website, such as IP address, browser type, device information, pages visited, time spent, click patterns, and referring URLs. This helps us improve your experience and the functionality of our platform.\n\nCookies and Similar Technologies:\nWe use cookies and tracking tools to remember your preferences, facilitate smooth navigation, and analyze user behavior. You can manage or disable cookies through your browser settings, but this may affect some website features.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `Service Delivery: To process course registrations, payments, and provide customer support.\n\nCommunication: To send you updates, course announcements, newsletters, and important notifications related to your account or transactions.\n\nPersonalization: To tailor content and recommendations based on your interests and interaction history.\n\nImprovement: To analyze usage trends and feedback in order to enhance our courses, tools, and overall user experience.\n\nMarketing: With your consent, to share special offers, promotions, and information about new courses or events. You can unsubscribe at any time.`,
  },
  {
    title: '3. Data Sharing and Disclosure',
    content: `We do not sell or rent your personal data to third parties. However, we may share your information with:\n\nService Providers: Trusted partners who assist us with payment processing, hosting, analytics, email communications, and customer support. These providers are bound by strict confidentiality agreements.\n\nLegal Authorities: When required by law or to protect the rights, safety, or property of Edunova, our users, or others, we may disclose your information in response to legal processes or investigations.`,
  },
  {
    title: '4. Data Security',
    content: `We employ industry-standard security measures including encryption, secure servers, and access controls to protect your personal information from unauthorized access, alteration, or disclosure. While we strive to safeguard your data, no system is completely infallible. Please take care to protect your account credentials.`,
  },
  {
    title: '5. Your Rights and Choices',
    content: `You have the right to:\n\n• Access and update your personal data through your account dashboard or by contacting us.\n• Request deletion of your personal data where applicable, subject to legal or operational requirements.\n• Opt-out of marketing communications at any time by following the unsubscribe instructions in our emails or contacting support.\n• Manage your cookie preferences through your browser settings.`,
  },
  {
    title: '6. International Users and Data Transfers',
    content: `If you are accessing Edunova from outside India, please note that your information may be transferred to and processed in India, where Edunova operates. By using our services, you consent to such transfer and processing.`,
  },
  {
    title: "7. Children's Privacy",
    content: `Edunova is not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected data from a minor without parental consent, please contact us immediately for prompt removal.`,
  },
  {
    title: '8. Changes to This Privacy Policy',
    content: `Edunova may update this Privacy Policy periodically to reflect changes in laws, technology, or business practices. We will notify you by posting the updated policy on our website with a new effective date. We encourage you to review this page regularly for the latest information.`,
  },
  {
    title: '9. Contact Us',
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us.`,
  },
]

const PrivacyPolicy = () => (
  <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
    <Typography
      variant="h2"
      sx={{
        fontWeight: 700,
        mb: 2,
        textAlign: 'center',
        letterSpacing: 1,
        color: 'primary.main',
      }}
    >
      Privacy Policy for Edunova
    </Typography>
    <Typography
      variant="h6"
      sx={{
        textAlign: 'center',
        mb: 4,
        color: 'primary.main',
        fontWeight: 400,
      }}
    >
      Effective Date: 2025
    </Typography>
    <Typography
      variant="body1"
      sx={{ mb: 4, textAlign: 'center', color: 'text.primary' }}
    >
      Welcome to Edunova! Your privacy and trust mean everything to us. This
      Privacy Policy explains how we collect, use, disclose, and protect your
      personal information when you use our services and visit our website. We
      are dedicated to maintaining the confidentiality and security of your data
      in accordance with applicable laws and best practices.
    </Typography>
    <Divider sx={{ mb: 4 }} />
    {sections.map((section) => (
      <Box key={section.title} sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}
        >
          {section.title}
        </Typography>
        {section.content.split('\n').map((para, i) => (
          <Typography
            key={i}
            variant="body1"
            sx={{ mb: 1.5, color: 'text.primary' }}
          >
            {para}
          </Typography>
        ))}
      </Box>
    ))}
    <Divider sx={{ my: 4 }} />
    <Typography
      variant="body1"
      sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 600 }}
    >
      Thank you for trusting Edunova with your learning journey and personal
      information.
      <br />
      We are committed to protecting your privacy every step of the way.
      <br />— Team Edunova
    </Typography>
  </Container>
)

export default PrivacyPolicy
