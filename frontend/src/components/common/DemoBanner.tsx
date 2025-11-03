import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Slide,
  Paper,
} from '@mui/material';
import {
  Close,
  PlayArrow,
  Star,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DemoBanner: React.FC = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1300,
          p: 2,
          maxWidth: 320,
          background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
          color: 'white',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 200, 83, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Star sx={{ color: '#FFD700', fontSize: '1.2rem' }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Try Demo Account
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={() => setOpen(false)}
            sx={{ color: 'white', mt: -0.5, mr: -0.5 }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>
        
        <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
          Explore all features with sample data - no signup required!
        </Typography>
        
        <Button
          fullWidth
          variant="contained"
          startIcon={<PlayArrow />}
          onClick={() => {
            navigate('/login');
            setOpen(false);
          }}
          sx={{
            bgcolor: 'white',
            color: 'primary.main',
            fontWeight: 600,
            '&:hover': {
              bgcolor: 'grey.100',
            },
          }}
        >
          Try Demo Now
        </Button>
      </Paper>
    </Slide>
  );
};

export default DemoBanner;