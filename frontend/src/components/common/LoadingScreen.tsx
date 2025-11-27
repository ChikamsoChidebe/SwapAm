import React from 'react';
import { Box, CircularProgress, Typography, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
  progress?: number;
  showProgress?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Loading...', 
  fullScreen = true,
  progress,
  showProgress = false
}) => {
  return (
    <Box
      sx={{
        position: fullScreen ? 'fixed' : 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
        color: 'white',
        zIndex: fullScreen ? 9999 : 1,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            mb: 3,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #FFFFFF 30%, #E8F5E8 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          SWAPAM
        </Typography>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            opacity: 0.9,
            textAlign: 'center',
          }}
        >
          {message}
        </Typography>
      </motion.div>

      {showProgress && progress !== undefined ? (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 200, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ width: 200, marginBottom: 20 }}
        >
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'white',
                borderRadius: 3,
              },
            }}
          />
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              textAlign: 'center',
              opacity: 0.8,
            }}
          >
            {Math.round(progress)}%
          </Typography>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Typography
          variant="body2"
          sx={{
            mt: 3,
            opacity: 0.7,
            textAlign: 'center',
          }}
        >
          Turn student waste into wealth
        </Typography>
      </motion.div>
    </Box>
  );
};

export default LoadingScreen;