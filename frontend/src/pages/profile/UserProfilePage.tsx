import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Avatar, Chip, Button, Divider } from '@mui/material';
import { LocationOn, Star, Verified, Message, Report } from '@mui/icons-material';

const UserProfilePage: React.FC = () => {
  const user = {
    name: 'John Doe',
    avatar: '/avatars/john.jpg',
    university: 'University of Lagos',
    location: 'Lagos, Nigeria',
    joinDate: 'January 2024',
    rating: 4.8,
    totalSwaps: 45,
    verified: true,
    bio: 'Computer Science student passionate about sustainability and technology. Love swapping books, electronics, and study materials.',
  };

  const recentItems = [
    { id: 1, title: 'MacBook Pro 2020', image: '/items/macbook.jpg', status: 'Available' },
    { id: 2, title: 'Calculus Textbook', image: '/items/book.jpg', status: 'Swapped' },
    { id: 3, title: 'iPhone 12', image: '/items/iphone.jpg', status: 'Available' },
  ];

  const reviews = [
    { id: 1, reviewer: 'Jane Smith', rating: 5, comment: 'Great person to swap with! Very reliable.', date: '2 days ago' },
    { id: 2, reviewer: 'Mike Johnson', rating: 4, comment: 'Quick response and smooth transaction.', date: '1 week ago' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Info */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                src={user.avatar}
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              >
                {user.name[0]}
              </Avatar>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <Typography variant="h5" sx={{ mr: 1 }}>{user.name}</Typography>
                {user.verified && <Verified color="primary" />}
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user.university}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2">{user.location}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
                <Chip
                  icon={<Star />}
                  label={`${user.rating} Rating`}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={`${user.totalSwaps} Swaps`}
                  variant="outlined"
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                <Button variant="contained" startIcon={<Message />}>
                  Message
                </Button>
                <Button variant="outlined" startIcon={<Report />}>
                  Report
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>About</Typography>
              <Typography variant="body2" color="text.secondary">
                {user.bio}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2">
                <strong>Joined:</strong> {user.joinDate}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Items & Reviews */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Recent Items</Typography>
              <Grid container spacing={2}>
                {recentItems.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card variant="outlined">
                      <Box
                        sx={{
                          height: 120,
                          bgcolor: 'grey.100',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Image
                        </Typography>
                      </Box>
                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="subtitle2" noWrap>
                          {item.title}
                        </Typography>
                        <Chip
                          label={item.status}
                          size="small"
                          color={item.status === 'Available' ? 'success' : 'default'}
                          sx={{ mt: 1 }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Reviews</Typography>
              {reviews.map((review) => (
                <Box key={review.id} sx={{ mb: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                      {review.reviewer[0]}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2">{review.reviewer}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            fontSize="small"
                            sx={{ color: i < review.rating ? 'warning.main' : 'grey.300' }}
                          />
                        ))}
                        <Typography variant="caption" sx={{ ml: 1 }}>
                          {review.date}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {review.comment}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfilePage;