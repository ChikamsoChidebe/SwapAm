import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';

const PrivacyPage: React.FC = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content: [
        'Personal information you provide when creating an account (name, email, university)',
        'Profile information and preferences you choose to share',
        'Messages and communications through our platform',
        'Usage data and analytics to improve our services',
        'Device information and IP addresses for security purposes'
      ]
    },
    {
      title: 'How We Use Your Information',
      content: [
        'To provide and maintain our swapping platform services',
        'To facilitate communication between users for swaps',
        'To verify your university affiliation and prevent fraud',
        'To send important updates about your account and transactions',
        'To improve our platform based on usage patterns and feedback'
      ]
    },
    {
      title: 'Information Sharing',
      content: [
        'We do not sell your personal information to third parties',
        'Profile information is visible to other verified users on the platform',
        'We may share data with service providers who help operate our platform',
        'Legal authorities may access information if required by law',
        'Anonymous, aggregated data may be used for research and analytics'
      ]
    },
    {
      title: 'Data Security',
      content: [
        'We use industry-standard encryption to protect your data',
        'Regular security audits and updates to our systems',
        'Secure servers and databases with restricted access',
        'Two-factor authentication options for enhanced account security',
        'Immediate notification of any potential security breaches'
      ]
    },
    {
      title: 'Your Rights',
      content: [
        'Access and download your personal data at any time',
        'Correct or update your information through your profile settings',
        'Delete your account and associated data permanently',
        'Opt out of non-essential communications and notifications',
        'Request information about how your data is being used'
      ]
    },
    {
      title: 'Cookies and Tracking',
      content: [
        'We use essential cookies for platform functionality',
        'Analytics cookies help us understand user behavior (optional)',
        'You can control cookie preferences in your browser settings',
        'Third-party services may use their own cookies',
        'No tracking for advertising or marketing purposes'
      ]
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 3 }}>
          Privacy Policy
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Last updated: January 2024
        </Typography>
      </Box>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          At SwapAm, we are committed to protecting your privacy and ensuring the security of your personal information. 
          This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
        </Typography>
        
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          By using SwapAm, you agree to the collection and use of information in accordance with this policy. 
          We will not use or share your information except as described in this Privacy Policy.
        </Typography>
      </Paper>

      {sections.map((section, index) => (
        <Paper key={index} sx={{ p: 4, mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
            {section.title}
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            {section.content.map((item, itemIndex) => (
              <Box component="li" key={itemIndex} sx={{ mb: 1 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      ))}

      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
          If you have any questions about this Privacy Policy or how we handle your data, please contact us:
        </Typography>
        <Box sx={{ pl: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email:</strong> privacy@swapam.com
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Address:</strong> Lagos, Nigeria
          </Typography>
          <Typography variant="body1">
            <strong>Response Time:</strong> We aim to respond to all privacy inquiries within 48 hours
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ textAlign: 'center', mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="body2" color="text.secondary">
          This Privacy Policy may be updated from time to time. We will notify users of any significant changes 
          via email or through our platform notifications.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPage;