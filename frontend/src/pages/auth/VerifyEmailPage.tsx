import React from 'react';
import { Container, Card, Typography, Button, Box } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const VerifyEmailPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Email Verified
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Your email has been successfully verified. You can now access all features.
        </Typography>
        <Button variant="contained" size="large">
          Continue to Dashboard
        </Button>
      </Card>
    </Container>
  );
};

export default VerifyEmailPage;