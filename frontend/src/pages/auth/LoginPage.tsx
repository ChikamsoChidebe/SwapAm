import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  TextField,
  Button,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  Apple,
  Email,
  Lock,
  PlayArrow,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError('');
        
        // Handle demo login
        if (values.email === 'demo@swapam.com' && values.password === 'demo123') {
          // Store demo flag and tokens
          localStorage.setItem('token', 'demo-token-123');
          localStorage.setItem('refreshToken', 'demo-refresh-token-123');
          localStorage.setItem('isDemo', 'true');
          
          // Navigate directly
          navigate('/dashboard/profile', { replace: true });
          return;
        }
        
        await login(values.email, values.password, values.rememberMe);
        navigate(from, { replace: true });
      } catch (error: any) {
        setError(error.response?.data?.message || 'Login failed. Please try again.');
      }
    },
  });

  const handleSocialLogin = (provider: string) => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/${provider}`;
  };

  return (
    <>
      <Helmet>
        <title>Sign In - Swapam</title>
        <meta name="description" content="Sign in to your Swapam account and start swapping items on campus." />
      </Helmet>

      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 50%, #2E7D32 100%)',
          display: 'flex',
          alignItems: 'center',
          py: 4,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              sx={{
                p: 4,
                borderRadius: 3,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.95)',
              }}
            >
              {/* Header */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    mb: 1,
                  }}
                >
                  SWAPAM
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  Welcome Back
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Sign in to continue your sustainable journey
                </Typography>
              </Box>

              {/* Error Alert */}
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {/* Social Login */}
              <Box sx={{ mb: 3 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  onClick={() => handleSocialLogin('google')}
                  sx={{ mb: 2, py: 1.5 }}
                >
                  Continue with Google
                </Button>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Facebook />}
                    onClick={() => handleSocialLogin('facebook')}
                    sx={{ py: 1.5 }}
                  >
                    Facebook
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Apple />}
                    onClick={() => handleSocialLogin('apple')}
                    sx={{ py: 1.5 }}
                  >
                    Apple
                  </Button>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  or continue with email
                </Typography>
              </Divider>

              {/* Login Form */}
              <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="rememberMe"
                        checked={formik.values.rememberMe}
                        onChange={formik.handleChange}
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    onClick={() => navigate('/forgot-password')}
                    sx={{ textDecoration: 'none' }}
                  >
                    Forgot password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={formik.isSubmitting}
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
                    mb: 3,
                  }}
                >
                  {formik.isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Sign In'
                  )}
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?{' '}
                    <Link
                      component="button"
                      type="button"
                      onClick={() => navigate('/register')}
                      sx={{ fontWeight: 600, textDecoration: 'none' }}
                    >
                      Sign up for free
                    </Link>
                  </Typography>
                </Box>
              </Box>

              {/* Demo Login */}
              <Box sx={{ mt: 3 }}>
                <Divider sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Try Demo
                  </Typography>
                </Divider>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<PlayArrow />}
                  onClick={() => {
                    formik.setValues({
                      email: 'demo@swapam.com',
                      password: 'demo123',
                      rememberMe: false,
                    });
                  }}
                  sx={{
                    py: 1.5,
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.dark',
                      bgcolor: 'primary.50',
                    },
                  }}
                >
                  Use Demo Account
                </Button>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
                  Explore all features with sample data
                </Typography>
              </Box>
            </Card>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;