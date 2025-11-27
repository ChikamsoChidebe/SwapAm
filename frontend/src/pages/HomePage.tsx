import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
} from '@mui/material';
import {
  PlayArrow,
  Recycling,
  TrendingUp,
  People,
  School,
  Star,
  ArrowForward,
  SwapHoriz,
  Nature,
  MonetizationOn,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Hero Section Component
const HeroSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const fullText = 'Turn campus waste into student wealth';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #CAAC2A 0%, #FDD835 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating particles */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '200px',
            height: '200px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            top: '10%',
            left: '10%',
            animation: 'float 6s ease-in-out infinite',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '150px',
            height: '150px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            bottom: '20%',
            right: '15%',
            animation: 'float 8s ease-in-out infinite reverse',
          },
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 700,
                  color: '#1a1a1a',
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                {typedText}
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    width: '3px',
                    height: '1em',
                    backgroundColor: '#137C5C',
                    ml: 1,
                    animation: 'blink 1s infinite',
                  }}
                />
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: '#4a4a4a',
                  mb: 4,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  lineHeight: 1.6,
                }}
              >
                Swap, sell, and donate items with ease. Build a sustainable campus community while saving money.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{
                    backgroundColor: '#137C5C',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#0f5132',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Join Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrow />}
                  sx={{
                    borderColor: '#137C5C',
                    color: '#137C5C',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    '&:hover': {
                      backgroundColor: '#f0fdfa',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 300, md: 500 },
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
              >
                <img
                  src="/hero-image.svg"
                  alt="Students swapping items"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Stats Section Component
const StatsSection: React.FC = () => {
  const stats = [
    { number: '25K+', label: 'Items Rescued', icon: <Recycling /> },
    { number: '8.5K+', label: 'Active Students', icon: <People /> },
    { number: '150+', label: 'Universities', icon: <School /> },
    { number: '98%', label: 'Satisfaction', icon: <Star /> },
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: '#0b3d2e', color: 'white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ mb: 2, color: '#4CAF50' }}>
                    {React.cloneElement(stat.icon, { fontSize: 'large' })}
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// How It Works Section
const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      title: 'Sign Up',
      description: 'Create your account with your university email',
      icon: <People />,
    },
    {
      title: 'List Items',
      description: 'Upload photos and descriptions of items to swap or sell',
      icon: <SwapHoriz />,
    },
    {
      title: 'Connect',
      description: 'Find and connect with other students on your campus',
      icon: <Nature />,
    },
    {
      title: 'Exchange',
      description: 'Complete safe transactions and build your reputation',
      icon: <MonetizationOn />,
    },
  ];

  return (
    <Box sx={{ py: 10, backgroundColor: '#f8fffe', position: 'relative', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            How SwapAm Works
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            Simple steps to transform your unused items into valuable resources
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 4,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,255,254,0.8) 100%)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0, 200, 83, 0.1)',
                    border: '1px solid rgba(0, 200, 83, 0.1)',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-12px) rotateX(5deg)',
                      boxShadow: '0 20px 40px rgba(0, 200, 83, 0.2)',
                    },
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* 3D White Square Step Number */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -25,
                      left: -25,
                      width: 70,
                      height: 70,
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15), inset 0 2px 0 rgba(255, 255, 255, 0.9)',
                      border: '3px solid rgba(0, 200, 83, 0.2)',
                      transform: 'rotateX(20deg) rotateY(-20deg)',
                      transformStyle: 'preserve-3d',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 6,
                        left: 6,
                        right: -6,
                        bottom: -6,
                        background: 'linear-gradient(135deg, rgba(0, 200, 83, 0.1) 0%, rgba(76, 175, 80, 0.1) 100%)',
                        borderRadius: 3,
                        transform: 'translateZ(-15px)',
                        zIndex: -1,
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        right: -12,
                        bottom: -12,
                        background: 'linear-gradient(135deg, rgba(0, 200, 83, 0.05) 0%, rgba(76, 175, 80, 0.05) 100%)',
                        borderRadius: 3,
                        transform: 'translateZ(-25px)',
                        zIndex: -2,
                      },
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textShadow: '0 2px 4px rgba(0, 200, 83, 0.2)',
                      }}
                    >
                      {index + 1}
                    </Typography>
                  </Box>

                  {/* Feature Icon */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 90,
                      height: 90,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
                      color: 'white',
                      mb: 3,
                      mt: 3,
                      mx: 'auto',
                      fontSize: '2.2rem',
                      boxShadow: '0 12px 28px rgba(0, 200, 83, 0.3)',
                      transform: 'rotateX(15deg)',
                      '&:hover': {
                        transform: 'rotateX(0deg) scale(1.1)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {React.cloneElement(step.icon, { fontSize: 'inherit' })}
                  </Box>

                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {step.description}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Floating 3D Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            right: '8%',
            width: 120,
            height: 120,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(0, 200, 83, 0.1) 100%)',
            borderRadius: 4,
            transform: 'rotateX(30deg) rotateY(30deg)',
            boxShadow: '0 25px 50px rgba(0, 200, 83, 0.1)',
            animation: 'float3d 8s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '5%',
            width: 80,
            height: 80,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255, 109, 0, 0.1) 100%)',
            borderRadius: 3,
            transform: 'rotateX(-20deg) rotateY(-30deg)',
            boxShadow: '0 20px 40px rgba(255, 109, 0, 0.1)',
            animation: 'float3d 10s ease-in-out infinite reverse',
          }}
        />
      </Container>
    </Box>
  );
};

// Auto-Sliding Testimonials Section
const TestimonialsSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      name: 'Sarah Ahmed',
      role: 'Computer Science Student',
      university: 'University of Lagos',
      content: 'SwapAm helped me furnish my dorm room for almost nothing! I swapped my old textbooks for a mini-fridge and desk lamp.',
      avatar: 'SA',
      rating: 5,
    },
    {
      name: 'Michael Okafor',
      role: 'Environmental Science Student',
      university: 'University of Ibadan',
      content: 'The environmental impact tracker is incredible. I\'ve prevented 50kg of waste from going to landfills this semester.',
      avatar: 'MO',
      rating: 5,
    },
    {
      name: 'Fatima Jibril',
      role: 'Business Student',
      university: 'Ahmadu Bello University',
      content: 'I\'ve made over ₦50,000 selling items I no longer need. SwapAm turned my clutter into cash!',
      avatar: 'FJ',
      rating: 5,
    },
    {
      name: 'David Okonkwo',
      role: 'Engineering Student',
      university: 'Covenant University',
      content: 'The campus agent system is brilliant! Safe, secure transactions right on campus.',
      avatar: 'DO',
      rating: 5,
    },
    {
      name: 'Aisha Bello',
      role: 'Medical Student',
      university: 'University of Abuja',
      content: 'Saved over ₦80,000 on textbooks and lab equipment through SwapAm exchanges.',
      avatar: 'AB',
      rating: 5,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <Box sx={{ py: 10, backgroundColor: 'white', position: 'relative', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
            What Students Say
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Hear from real students making a difference with SwapAm
          </Typography>
        </Box>

        {/* Auto-sliding testimonials */}
        <Box sx={{ position: 'relative', height: 300, mb: 4 }}>
          {testimonials.map((testimonial, index) => (
            <Slide
              key={index}
              direction="left"
              in={index === currentSlide}
              timeout={600}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  display: index === currentSlide ? 'block' : 'none',
                }}
              >
                <Card
                  sx={{
                    maxWidth: 800,
                    mx: 'auto',
                    p: 4,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,255,254,0.9) 100%)',
                    boxShadow: '0 12px 40px rgba(0, 200, 83, 0.15)',
                    border: '1px solid rgba(0, 200, 83, 0.1)',
                    textAlign: 'center',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} sx={{ color: '#FFD700', fontSize: '1.5rem' }} />
                      ))}
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 4, 
                        fontStyle: 'italic', 
                        color: '#2c3e50',
                        lineHeight: 1.6,
                        fontSize: '1.2rem'
                      }}
                    >
                      "{testimonial.content}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                      <Avatar 
                        sx={{ 
                          backgroundColor: '#00C853', 
                          width: 60, 
                          height: 60,
                          fontSize: '1.5rem',
                          fontWeight: 700
                        }}
                      >
                        {testimonial.avatar}
                      </Avatar>
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          {testimonial.role}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#00C853', fontWeight: 600 }}>
                          {testimonial.university}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Slide>
          ))}
        </Box>

        {/* Slide indicators */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          {testimonials.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: index === currentSlide ? '#00C853' : 'rgba(0, 200, 83, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#00C853',
                  transform: 'scale(1.2)',
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

// CTA Section
const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: 10,
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
          <Typography variant="h2" sx={{ fontWeight: 600, mb: 3 }}>
            Ready to Start Your Sustainable Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of students making a positive impact on their campuses and wallets
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: 'grey.100',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Sign Up Free
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Download App
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

// Main HomePage Component
const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>SwapAm - Turn Campus Waste Into Student Wealth</title>
        <meta
          name="description"
          content="Join the circular economy revolution. Swap, sell, and donate items while earning rewards and making a positive environmental impact on your campus."
        />
        <meta name="keywords" content="campus, sustainability, swap, sell, donate, students, circular economy" />
      </Helmet>

      <Box sx={{ overflow: 'hidden' }}>
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </Box>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes float3d {
            0%, 100% { 
              transform: rotateX(25deg) rotateY(25deg) translateY(0px) translateZ(0px); 
            }
            50% { 
              transform: rotateX(25deg) rotateY(25deg) translateY(-30px) translateZ(20px); 
            }
          }
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>
    </>
  );
};

export default HomePage;