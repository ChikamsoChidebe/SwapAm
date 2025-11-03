import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, LinearProgress, Chip } from '@mui/material';
import { Nature, Recycling, TrendingUp, People, LocalFlorist, WaterDrop } from '@mui/icons-material';

const SustainabilityPage: React.FC = () => {
  const impactStats = [
    { icon: <Recycling />, title: 'Items Saved from Waste', value: '12,450', color: 'success' },
    { icon: <WaterDrop />, title: 'Water Saved (Liters)', value: '89,320', color: 'info' },
    { icon: <LocalFlorist />, title: 'CO2 Reduced (kg)', value: '5,670', color: 'primary' },
    { icon: <People />, title: 'Students Engaged', value: '3,240', color: 'secondary' },
  ];

  const goals = [
    { title: 'Zero Waste Campus', progress: 65, target: '2025' },
    { title: 'Carbon Neutral Operations', progress: 40, target: '2026' },
    { title: 'Circular Economy Adoption', progress: 78, target: '2024' },
  ];

  const initiatives = [
    {
      title: 'Campus Swap Events',
      description: 'Monthly events where students can swap items in person',
      impact: '500+ items swapped monthly'
    },
    {
      title: 'E-Waste Collection',
      description: 'Proper disposal and recycling of electronic waste',
      impact: '2 tons of e-waste recycled'
    },
    {
      title: 'Sustainability Education',
      description: 'Workshops and seminars on sustainable living',
      impact: '1000+ students educated'
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 3 }}>
          Our Sustainability Impact
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Together, we're building a more sustainable future by reducing waste and promoting circular economy principles on campus.
        </Typography>
      </Box>

      {/* Impact Statistics */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {impactStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
              <Box sx={{ color: `${stat.color}.main`, mb: 2, fontSize: 48 }}>
                {stat.icon}
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.title}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Sustainability Goals */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 4 }}>
          Our Goals
        </Typography>
        <Grid container spacing={4}>
          {goals.map((goal, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  {goal.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={goal.progress}
                    sx={{ flex: 1, mr: 2, height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {goal.progress}%
                  </Typography>
                </Box>
                <Chip
                  label={`Target: ${goal.target}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Initiatives */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 4 }}>
          Our Initiatives
        </Typography>
        <Grid container spacing={4}>
          {initiatives.map((initiative, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  {initiative.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {initiative.description}
                </Typography>
                <Box sx={{ 
                  bgcolor: 'success.light', 
                  color: 'success.contrastText', 
                  p: 1.5, 
                  borderRadius: 1,
                  textAlign: 'center'
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {initiative.impact}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box sx={{ 
        textAlign: 'center', 
        bgcolor: 'primary.main', 
        color: 'white', 
        p: 6, 
        borderRadius: 3 
      }}>
        <Nature sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Join the Movement
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 600, mx: 'auto' }}>
          Every swap makes a difference. Start your sustainable journey today and help us create a greener campus for everyone.
        </Typography>
      </Box>
    </Container>
  );
};

export default SustainabilityPage;