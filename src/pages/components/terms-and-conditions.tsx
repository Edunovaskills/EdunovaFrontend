import React from 'react'
import { Container, Typography, Box, Divider } from '@mui/material'

const terms = [
  {
    title: '1. Acceptance of Terms',
    content: `By using Edunova's website or Services, you affirm that you have read, understood, and agree to abide by these Terms in full. If you do not agree with any part of these Terms, you must not use our Services or access our website.`,
  },
  {
    title: '2. Eligibility',
    content: `You must be at least 18 years old or have legal guardian consent to register for or participate in our courses and Services. By enrolling, you confirm you meet these age requirements and have the legal capacity to enter into this agreement.`,
  },
  {
    title: '3. Account Registration and User Responsibilities',
    content: `To access some Services, you may be required to create an account and provide accurate personal information.\n\nYou are responsible for maintaining the confidentiality of your login details and for all activities performed under your account.\n\nYou agree to notify us immediately if you suspect unauthorized use or security breaches related to your account.\n\nYou agree not to share your login credentials or allow unauthorized persons to access your account.`,
  },
  {
    title: '4. Course Enrollment, Fees, and Payment Terms',
    content: `All fees and charges for courses or Services are clearly listed on our website or during enrollment. Payments must be made in full prior to the start of any course.\n\nWe accept payments through secure, authorized payment gateways only.\n\nCourse fees are generally non-refundable, except under special circumstances such as cancellation by Edunova or substantial course changes.\n\nIf Edunova cancels a course, enrolled participants will receive a full refund or be offered alternative dates.\n\nDiscounts, promotional offers, or scholarships may be offered from time to time at Edunova's discretion and can be withdrawn or modified without prior notice.`,
  },
  {
    title: '5. Intellectual Property Rights',
    content: `All educational content, materials, logos, graphics, videos, documents, and software on this website and related Services are the intellectual property of Edunova or its licensors.\n\nYou are granted a limited, personal, non-transferable license to use this content solely for your personal, non-commercial educational purposes.\n\nYou must not reproduce, copy, distribute, sell, or exploit any content without express written permission from Edunova.\n\nUnauthorized use of our intellectual property may lead to legal action.`,
  },
  {
    title: '6. Use of Services and Code of Conduct',
    content: `When using Edunova's Services, you agree to:\n\n• Use the Services only for lawful and appropriate purposes.\n• Avoid posting, uploading, or sharing any content that is offensive, defamatory, illegal, or violates the rights of others.\n• Not engage in activities that disrupt, damage, or interfere with the Services or website functionality.\n• Respect other users' privacy and rights.\n• Comply with all applicable local, national, and international laws while using our Services.`,
  },
  {
    title: '7. Privacy and Data Protection',
    content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, store, and protect your personal data.\n\nBy using our Services, you consent to the collection and use of your information as described in the Privacy Policy.\n\nWe implement reasonable security measures to safeguard your data but cannot guarantee absolute security.`,
  },
  {
    title: '8. Third-Party Links and Content',
    content: `Our website or Services may contain links to third-party websites or resources. These links are provided for your convenience only.\n\nEdunova does not endorse and is not responsible for the content, products, or services on third-party sites.\n\nAccess and use of third-party websites are at your own risk, and you should review their terms and policies separately.`,
  },
  {
    title: '9. Disclaimers and Limitation of Liability',
    content: `Edunova provides its Services "as is" without warranties of any kind, either express or implied.\n\nWe do not guarantee any specific results or outcomes, including employment, certification, or academic success, following participation in our courses.\n\nTo the maximum extent permitted by law, Edunova shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use or inability to use the Services.\n\nEdunova is not responsible for any loss, damage, or injury resulting from reliance on the content or Services provided.`,
  },
  {
    title: '10. Modification of Services and Terms',
    content: `We reserve the right to modify, suspend, or discontinue any part of our Services, including courses or website features, at any time without prior notice.\n\nEdunova may also update these Terms periodically to reflect changes in legal requirements or business practices.\n\nYour continued use of the Services after any such modifications constitutes your acceptance of the updated Terms.`,
  },
  {
    title: '11. Termination and Suspension',
    content: `We may suspend or terminate your access to Services without notice for breach of these Terms, illegal activities, or any conduct harmful to Edunova or its users.\n\nTermination does not entitle you to any refund or compensation.`,
  },
  {
    title: '12. Force Majeure',
    content: `Edunova shall not be held liable for delays or failure in performance resulting from causes beyond our reasonable control, including but not limited to natural disasters, government actions, pandemics, or technical failures.`,
  },
  {
    title: '13. Governing Law and Dispute Resolution',
    content: `These Terms shall be governed by and construed in accordance with the laws of [Your State/Country].\n\nAny disputes arising from or related to these Terms or use of Services will be subject to the exclusive jurisdiction of courts located in [Your City/State].\n\nYou agree to resolve disputes amicably before pursuing formal legal action.`,
  },
  {
    title: '14. Contact Us',
    content: `If you have questions or concerns about these Terms, please contact us. `,
  },
]

const TermsAndConditions = () => (
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
      Terms & Conditions
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
      Last Updated: 2025
    </Typography>
    <Typography
      variant="body1"
      sx={{ mb: 4, textAlign: 'center', color: 'text.primary' }}
    >
      Welcome to Edunova! These Terms and Conditions ("Terms") govern your use
      of our website, services, courses, workshops, training programs, and any
      other offerings provided by Edunova ("we," "us," or "our"). By accessing
      or using any of our Services, you agree to be legally bound by these
      Terms. Please read them carefully before proceeding.
    </Typography>
    <Divider sx={{ mb: 4 }} />
    {terms.map((section) => (
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
      Thank you for choosing Edunova as your trusted learning partner. We are
      dedicated to providing quality education with integrity, innovation, and
      excellence.
      <br />— Team Edunova
    </Typography>
  </Container>
)

export default TermsAndConditions
