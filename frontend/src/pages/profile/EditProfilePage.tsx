import React from 'react';
import { Container, Card, TextField, Button, Typography, Box, Grid, Avatar, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  username: yup.string().required('Username is required'),
  bio: yup.string().max(500, 'Bio must be less than 500 characters'),
  phone: yup.string(),
});

const EditProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      username: user?.username || '',
      bio: user?.bio || '',
      phone: user?.phone || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await updateProfile(values);
        navigate('/profile');
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    },
  });

  if (!user) return <div>Loading...</div>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Profile
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={user.avatar || undefined}
              sx={{ width: 100, height: 100 }}
            >
              {user.firstName[0]}{user.lastName[0]}
            </Avatar>
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
              size="small"
            >
              <PhotoCamera fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ ml: 3 }}>
            <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
            <Typography variant="body2" color="text.secondary">
              Click the camera icon to change your profile picture
            </Typography>
          </Box>
        </Box>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="bio"
                label="Bio"
                multiline
                rows={4}
                value={formik.values.bio}
                onChange={formik.handleChange}
                error={formik.touched.bio && Boolean(formik.errors.bio)}
                helperText={formik.touched.bio && formik.errors.bio}
                placeholder="Tell others about yourself..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="phone"
                label="Phone Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/profile')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default EditProfilePage;