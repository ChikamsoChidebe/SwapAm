import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, TextField, Button } from '@mui/material';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});

const ContactPage: React.FC = () => {
  const formik = useFormik({
    initialValues: { name: '', email: '', subject: '', message: '' },
    validationSchema,
    onSubmit: (values) => {
      console.log('Contact form submitted:', values);
    },
  });

  const contactInfo = [
    { icon: <Email />, title: 'Email', value: 'hello@swapam.com' },
    { icon: <Phone />, title: 'Phone', value: '+234 (0) 800 SWAPAM' },
    { icon: <LocationOn />, title: 'Address', value: 'Lagos, Nigeria' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 2 }}>Contact Us</Typography>
      <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mb: 6 }}>
        Get in touch with our team
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          {contactInfo.map((info, index) => (
            <Card key={index} sx={{ mb: 3, p: 3, textAlign: 'center' }}>
              <Box sx={{ color: 'primary.main', mb: 2, fontSize: 40 }}>{info.icon}</Box>
              <Typography variant="h6" gutterBottom>{info.title}</Typography>
              <Typography variant="body1">{info.value}</Typography>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>Send us a message</Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="subject"
                    label="Subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    error={formik.touched.subject && Boolean(formik.errors.subject)}
                    helperText={formik.touched.subject && formik.errors.subject}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="message"
                    label="Message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Send />}
                sx={{ mt: 3 }}
              >
                Send Message
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactPage;