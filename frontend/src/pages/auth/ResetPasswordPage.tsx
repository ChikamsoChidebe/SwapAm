import React from 'react';
import { Container, Card, TextField, Button, Typography, Box } from '@mui/material';

const ResetPasswordPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Reset Password
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField fullWidth label="New Password" type="password" margin="normal" />
          <TextField fullWidth label="Confirm Password" type="password" margin="normal" />
          <Button fullWidth variant="contained" sx={{ mt: 3 }}>
            Reset Password
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default ResetPasswordPage;