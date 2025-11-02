import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const TermsPage: React.FC = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using SwapAm, you accept and agree to be bound by these Terms of Service',
        'If you do not agree to these terms, you may not use our platform',
        'We reserve the right to modify these terms at any time with notice to users',
        'Continued use of the platform after changes constitutes acceptance of new terms'
      ]
    },
    {
      title: 'Eligibility',
      content: [
        'You must be a current student at a participating university',
        'You must provide a valid university email address for verification',
        'You must be at least 18 years old or have parental consent',
        'You are responsible for maintaining the confidentiality of your account'
      ]
    },
    {
      title: 'Platform Usage',
      content: [
        'SwapAm is for educational and personal use only, not commercial purposes',
        'You may only list items that you own and have the right to swap',
        'All items must comply with university policies and local laws',
        'Prohibited items include illegal substances, weapons, and copyrighted materials'
      ]
    },
    {
      title: 'User Conduct',
      content: [
        'Treat all users with respect and courtesy',
        'Provide accurate descriptions and photos of items',
        'Honor swap agreements and show up to scheduled meetings',
        'Report any suspicious or inappropriate behavior immediately',
        'Do not use the platform for harassment, spam, or fraudulent activities'
      ]
    },
    {
      title: 'Swapping Process',
      content: [
        'All swaps are agreements between individual users, not SwapAm',
        'SwapAm facilitates connections but is not party to swap transactions',
        'Users are responsible for inspecting items before completing swaps',
        'Disputes should be resolved directly between users when possible',
        'SwapAm may mediate disputes but is not obligated to do so'
      ]
    },
    {
      title: 'Safety and Security',
      content: [
        'Always meet in public, well-lit areas on campus',
        'Bring a friend when meeting someone for the first time',
        'Trust your instincts and report any concerning behavior',
        'SwapAm is not responsible for personal safety during meetups',
        'Users participate in swaps at their own risk'
      ]
    },
    {
      title: 'Intellectual Property',
      content: [
        'SwapAm owns all rights to the platform, design, and functionality',
        'Users retain rights to their own content and item listings',
        'By posting content, you grant SwapAm license to display it on the platform',
        'Do not post copyrighted material without proper authorization'
      ]
    },
    {
      title: 'Limitation of Liability',
      content: [
        'SwapAm provides the platform "as is" without warranties',
        'We are not liable for any damages arising from platform use',
        'Users assume all risks associated with swapping activities',
        'Our liability is limited to the maximum extent permitted by law',
        'We do not guarantee the quality, safety, or legality of items listed'
      ]
    },
    {
      title: 'Account Termination',
      content: [
        'We may suspend or terminate accounts for violations of these terms',
        'Users may delete their accounts at any time',
        'Termination does not affect completed transactions or ongoing disputes',
        'We reserve the right to refuse service to anyone'
      ]
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 3 }}>
          Terms of Service
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Last updated: January 2024
        </Typography>
      </Box>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Welcome to SwapAm! These Terms of Service ("Terms") govern your use of our platform and services. 
          Please read them carefully as they contain important information about your rights and obligations.
        </Typography>
        
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          SwapAm is a platform designed to facilitate sustainable item swapping among university students. 
          By using our services, you agree to comply with these terms and our community guidelines.
        </Typography>
      </Paper>

      {sections.map((section, index) => (
        <Paper key={index} sx={{ p: 4, mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
            {index + 1}. {section.title}
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
          Contact Information
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
          If you have questions about these Terms of Service, please contact us:
        </Typography>
        <Box sx={{ pl: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email:</strong> legal@swapam.com
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Address:</strong> Lagos, Nigeria
          </Typography>
          <Typography variant="body1">
            <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM WAT
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ textAlign: 'center', mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="body2" color="text.secondary">
          By continuing to use SwapAm, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsPage;