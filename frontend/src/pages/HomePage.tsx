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
  Nature,
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
    { icon: <Nature />, value: '50T', label: 'CO₂ Saved' },
    { icon: <TrendingUp />, value: '₦2M+', label: 'Value Created' },
  ];

  const features = [
    {
      title: 'AI-Powered Valuation',
      description: 'Get instant, accurate valuations for your items using our advanced AI technology.',
      icon: <TrendingUp />,
      color: '#4CAF50',
    },
    {
      title: 'Campus Agents',
      description: 'Trusted local agents handle pickup, verification, and delivery for seamless swaps.',
      icon: <People />,
      color: '#FF9800',
    },
    {
      title: 'Points System',
      description: 'Earn points for every item you list and use them to get items you need.',
      icon: <Star />,
      color: '#F57F17',
    },
    {
      title: 'Sustainability Impact',
      description: 'Track your environmental impact and contribute to a circular economy.',
      icon: <Nature />,
      color: '#4CAF50',
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

                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/register')}
                      sx={{
                        bgcolor: 'white',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        border: '2px solid white',
                        '&:hover': {
                          bgcolor: '#f5f5f5',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Get Started Free
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<PlayArrow />}
                      onClick={() => navigate('/login')}
                      sx={{
                        borderColor: 'white',
                        borderWidth: 2,
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(10px)',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Try Demo
                    </Button>
                  </Box>

                  {/* Demo Info */}
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: 3,
                      px: 3,
                      py: 1.5,
                    }}
                  >
                    <Star sx={{ color: '#FFD700', fontSize: '1.2rem' }} />
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                      Try our demo account - no signup required!
                    </Typography>
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
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: 500,
                        height: 400,
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      <img
                        src="/hero-mockup.svg"
                        alt="Swapam App Interface"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        onError={(e) => {
                          // Fallback to glass morphism design if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div style="
                                width: 100%;
                                height: 100%;
                                background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
                                backdrop-filter: blur(10px);
                                border: 1px solid rgba(255,255,255,0.3);
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-direction: column;
                                gap: 24px;
                                border-radius: 16px;
                              ">
                                <div style="display: flex; gap: 16px; align-items: center;">
                                  <div style="font-size: 4rem; color: white;">⇄</div>
                                  <div style="font-size: 3rem; color: #FFD700;">🌱</div>
                                  <div style="font-size: 3rem; color: white;">👥</div>
                                </div>
                                <h3 style="color: white; text-align: center; font-weight: 600; margin: 0;">Campus Circular Economy</h3>
                                <p style="color: rgba(255,255,255,0.8); text-align: center; margin: 0;">Swap • Share • Sustain</p>
                              </div>
                            `;
                          }
                        }}
                      />
                    </Box>
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
              color: 'white',
            }}
          >
            <Nature sx={{ fontSize: 'inherit' }} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: '20%',
              left: '5%',
              opacity: 0.1,
              fontSize: '6rem',
              color: 'white',
            }}
          >
            <SwapHoriz sx={{ fontSize: 'inherit' }} />
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
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            bgcolor: feature.color,
                            color: 'white',
                            mb: 3,
                            fontSize: '2rem',
                          }}
                        >
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
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    border: '2px solid white',
                    '&:hover': {
                      bgcolor: '#f5f5f5',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
                    },
                    transition: 'all 0.3s ease',
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
                    borderWidth: 2,
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                    },
                    transition: 'all 0.3s ease',
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