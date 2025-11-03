import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Avatar } from '@mui/material';
import { Nature, People, TrendingUp, School } from '@mui/icons-material';

const AboutPage: React.FC = () => {
  const features = [
    { icon: <Nature />, title: 'Sustainable', description: 'Reduce waste and promote circular economy' },
    { icon: <People />, title: 'Community', description: 'Connect students across campuses' },
    { icon: <TrendingUp />, title: 'Profitable', description: 'Turn waste into wealth' },
    { icon: <School />, title: 'Educational', description: 'Learn about sustainability' },
  ];

  const team = [
    { name: 'John Doe', role: 'CEO & Founder', avatar: '/team/john.jpg' },
    { name: 'Jane Smith', role: 'CTO', avatar: '/team/jane.jpg' },
    { name: 'Mike Johnson', role: 'Head of Design', avatar: '/team/mike.jpg' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 3 }}>
          About Swapam
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          We're building the future of campus sustainability by turning student waste into wealth through our circular economy platform.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
              <Box sx={{ color: 'primary.main', mb: 2, fontSize: 48 }}>
                {feature.icon}
              </Box>
              <Typography variant="h6" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 4 }}>
          Our Mission
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: 1.8, textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
          To create a sustainable future by empowering students to participate in the circular economy, 
          reducing campus waste, and making essential items accessible to all students regardless of their financial situation.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 4 }}>
          Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Avatar
                  src={member.avatar}
                  sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                >
                  {member.name[0]}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.role}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutPage;