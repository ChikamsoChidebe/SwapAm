import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  TextField,
  Button,
  Chip,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  Email,
  Phone,
  LocationOn,
  Send,
  Nature,
  School,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'Browse Items', href: '/browse' },
        { label: 'Categories', href: '/categories' },
        { label: 'Mobile App', href: '/app' },
        { label: 'Campus Partners', href: '/partners' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Safety Guidelines', href: '/safety' },
        { label: 'Community Rules', href: '/community-rules' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Report Issue', href: '/report' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Sustainability', href: '/sustainability' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press Kit', href: '/press' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'GDPR', href: '/gdpr' },
        { label: 'Accessibility', href: '/accessibility' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook />, href: 'https://facebook.com/swapam', label: 'Facebook' },
    { icon: <Twitter />, href: 'https://twitter.com/swapam', label: 'Twitter' },
    { icon: <Instagram />, href: 'https://instagram.com/swapam', label: 'Instagram' },
    { icon: <LinkedIn />, href: 'https://linkedin.com/company/swapam', label: 'LinkedIn' },
    { icon: <YouTube />, href: 'https://youtube.com/swapam', label: 'YouTube' },
  ];

  const stats = [
    { number: '25K+', label: 'Items Rescued' },
    { number: '8.5K+', label: 'Active Students' },
    { number: '150+', label: 'Universities' },
    { number: '98%', label: 'Satisfaction' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: 'white',
        pt: 6,
        pb: 2,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                mb: 4,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Our Impact
            </Typography>
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          mb: 1,
                          background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
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
          </Box>
        </motion.div>

        <Divider sx={{ mb: 6, borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Main Footer Content */}
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <School sx={{ color: 'white', fontSize: 28 }} />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    SwapAm
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ mb: 3, opacity: 0.9, lineHeight: 1.6 }}>
                  Transforming campus sustainability through innovative circular economy solutions. 
                  Join thousands of students making a positive impact.
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Nature sx={{ color: 'primary.main' }} />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Carbon Neutral Platform
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  <Chip
                    label="Sustainable"
                    size="small"
                    sx={{ backgroundColor: 'primary.main', color: 'white' }}
                  />
                  <Chip
                    label="Student-First"
                    size="small"
                    sx={{ backgroundColor: 'secondary.main', color: 'white' }}
                  />
                  <Chip
                    label="Verified Safe"
                    size="small"
                    sx={{ backgroundColor: 'success.main', color: 'white' }}
                  />
                </Box>

                {/* Contact Info */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Email sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      hello@swapam.com
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Phone sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      +234 (0) 800 SWAPAM
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Lagos, Nigeria
                    </Typography>
                  </Box>
                </Box>

                {/* Social Links */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconButton
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'primary.main',
                            transform: 'translateY(-2px)',
                          },
                        }}
                        aria-label={social.label}
                      >
                        {social.icon}
                      </IconButton>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Footer Links */}
          {footerSections.map((section, sectionIndex) => (
            <Grid item xs={6} md={2} key={sectionIndex}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'primary.main',
                  }}
                >
                  {section.title}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      component={RouterLink}
                      to={link.href}
                      sx={{
                        color: 'rgba(255,255,255,0.8)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: 'primary.main',
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              mt: 6,
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, rgba(0,200,83,0.1) 0%, rgba(76,175,80,0.1) 100%)',
              border: '1px solid rgba(0,200,83,0.2)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Stay Updated
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Get the latest updates on sustainability initiatives and new features
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                maxWidth: 400,
                mx: 'auto',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <TextField
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '& input': {
                      color: 'white',
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                endIcon={<Send />}
                sx={{
                  background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #009624 0%, #388E3C 100%)',
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>
        </motion.div>

        {/* Bottom Bar */}
        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {currentYear} SwapAm. All rights reserved. Revolutionizing campus sustainability.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Link
              component={RouterLink}
              to="/privacy"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Privacy
            </Link>
            <Link
              component={RouterLink}
              to="/terms"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Terms
            </Link>
            <Link
              component={RouterLink}
              to="/cookies"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Cookies
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;