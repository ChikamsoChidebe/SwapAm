import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  TrendingUp,
  Eco,
  SwapHoriz,
  People,
  Star,
  ArrowForward,
  PlayArrow,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const stats = [
    { icon: <SwapHoriz />, value: '10K+', label: 'Items Swapped' },
    { icon: <People />, value: '5K+', label: 'Active Users' },
    { icon: <Eco />, value: '50T', label: 'CO₂ Saved' },
    { icon: <TrendingUp />, value: '₦2M+', label: 'Value Created' },
  ];

  const features = [
    {
      title: 'AI-Powered Valuation',
      description: 'Get instant, accurate valuations for your items using our advanced AI technology.',
      icon: '🤖',
    },
    {
      title: 'Campus Agents',
      description: 'Trusted local agents handle pickup, verification, and delivery for seamless swaps.',
      icon: '🚚',
    },
    {
      title: 'Points System',
      description: 'Earn points for every item you list and use them to get items you need.',
      icon: '💎',
    },
    {
      title: 'Sustainability Impact',
      description: 'Track your environmental impact and contribute to a circular economy.',
      icon: '🌱',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Computer Science Student',
      university: 'University of Lagos',
      avatar: '/avatars/sarah.jpg',
      rating: 5,
      comment: 'Swapam helped me get all my textbooks for free by swapping items I no longer needed. Amazing platform!',
    },
    {
      name: 'Michael Chen',
      role: 'Engineering Student',
      university: 'Covenant University',
      avatar: '/avatars/michael.jpg',
      rating: 5,
      comment: 'The AI valuation is spot-on and the campus agents are super reliable. Love the sustainability aspect!',
    },
    {
      name: 'Amara Okafor',
      role: 'Business Student',
      university: 'Babcock University',
      avatar: '/avatars/amara.jpg',
      rating: 5,
      comment: 'Made ₦50,000 worth of swaps in my first month. This platform is a game-changer for students!',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Swapam - Campus Circular Economy Platform</title>
        <meta name="description" content="Turn student waste into wealth. Swap, sell, or donate used items on campus. Join the circular economy revolution." />
      </Helmet>

      <Box sx={{ minHeight: '100vh' }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
            color: 'white',
            py: { xs: 8, md: 12 },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      fontWeight: 800,
                      mb: 2,
                      lineHeight: 1.2,
                    }}
                  >
                    Turn Student Waste Into{' '}
                    <Box
                      component="span"
                      sx={{
                        background: 'linear-gradient(45deg, #FFD700 30%, #FFA000 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Wealth
                    </Box>
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      mb: 4,
                      opacity: 0.9,
                      fontWeight: 400,
                      lineHeight: 1.4,
                    }}
                  >
                    Join the campus circular economy. Swap, sell, or donate used items.
                    Make sustainability profitable.
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/register')}
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        '&:hover': {
                          bgcolor: 'grey.100',
                        },
                      }}
                    >
                      Get Started Free
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<PlayArrow />}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      Watch Demo
                    </Button>
                  </Box>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      textAlign: 'center',
                    }}
                  >
                    <img
                      src="/hero-image.png"
                      alt="Students using Swapam"
                      style={{
                        width: '100%',
                        maxWidth: 500,
                        height: 'auto',
                        borderRadius: 16,
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                      }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Container>

          {/* Floating Elements */}
          <Box
            sx={{
              position: 'absolute',
              top: '20%',
              right: '10%',
              opacity: 0.1,
              fontSize: '8rem',
            }}
          >
            ♻️
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: '20%',
              left: '5%',
              opacity: 0.1,
              fontSize: '6rem',
            }}
          >
            💚
          </Box>
        </Box>

        {/* Stats Section */}
        <Box sx={{ py: 6, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          color: 'white',
                          mb: 2,
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                sx={{
                  textAlign: 'center',
                  mb: 2,
                  fontWeight: 700,
                }}
              >
                How Swapam Works
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'center',
                  mb: 6,
                  color: 'text.secondary',
                  maxWidth: 600,
                  mx: 'auto',
                }}
              >
                Our platform makes it easy to turn your unused items into valuable resources
              </Typography>
            </motion.div>

            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        p: 3,
                        border: 'none',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <CardContent>
                        <Box sx={{ fontSize: '3rem', mb: 2 }}>
                          {feature.icon}
                        </Box>
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                sx={{
                  textAlign: 'center',
                  mb: 2,
                  fontWeight: 700,
                }}
              >
                What Students Say
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'center',
                  mb: 6,
                  color: 'text.secondary',
                  maxWidth: 600,
                  mx: 'auto',
                }}
              >
                Join thousands of students who are already benefiting from Swapam
              </Typography>
            </motion.div>

            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        p: 3,
                        textAlign: 'center',
                        border: 'none',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      <CardContent>
                        <Avatar
                          src={testimonial.avatar}
                          sx={{
                            width: 80,
                            height: 80,
                            mx: 'auto',
                            mb: 2,
                          }}
                        >
                          {testimonial.name[0]}
                        </Avatar>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} sx={{ color: 'warning.main', fontSize: 20 }} />
                          ))}
                        </Box>

                        <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                          "{testimonial.comment}"
                        </Typography>

                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          {testimonial.role}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {testimonial.university}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            py: 8,
            background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                }}
              >
                Ready to Start Swapping?
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  maxWidth: 500,
                  mx: 'auto',
                }}
              >
                Join thousands of students who are already making money while saving the planet
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                  }}
                >
                  Sign Up Now
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/browse')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Browse Items
                </Button>
              </Box>
            </motion.div>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;