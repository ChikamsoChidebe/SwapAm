import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Chip,
  Button,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Badge,
  Paper,
} from '@mui/material';
import {
  Edit,
  Star,
  TrendingUp,
  Eco,
  SwapHoriz,
  Share,
  PhotoCamera,
  LocationOn,
  School,
  Phone,
  Email,
  CalendarToday,
  EmojiEvents,
  Verified,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
    location: user?.location?.name || '',
  });

  const [activityData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Points Earned',
        data: [120, 190, 300, 500, 200, 300],
        borderColor: '#00C853',
        backgroundColor: 'rgba(0, 200, 83, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Items Swapped',
        data: [5, 8, 12, 20, 8, 15],
        borderColor: '#FF6D00',
        backgroundColor: 'rgba(255, 109, 0, 0.1)',
        tension: 0.4,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Activity Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6">Loading profile...</Typography>
      </Container>
    );
  }

  const handleEditSave = async () => {
    try {
      await updateProfile(editForm);
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleShare = () => {
    const profileUrl = `${window.location.origin}/users/${user.id}`;
    if (navigator.share) {
      navigator.share({
        title: `${user.firstName} ${user.lastName} - Swapam Profile`,
        text: `Check out my Swapam profile!`,
        url: profileUrl,
      });
    } else {
      navigator.clipboard.writeText(profileUrl);
      setShareDialogOpen(false);
    }
  };

  const getNextBadge = () => {
    const totalSwaps = user.totalSwaps;
    if (totalSwaps < 5) return { name: 'Beginner Swapper', needed: 5 - totalSwaps };
    if (totalSwaps < 25) return { name: 'Active Swapper', needed: 25 - totalSwaps };
    if (totalSwaps < 100) return { name: 'Expert Swapper', needed: 100 - totalSwaps };
    return { name: 'Master Swapper', needed: 0 };
  };

  const nextBadge = getNextBadge();

  return (
    <>
      <Helmet>
        <title>{`${user.firstName} ${user.lastName} - Profile | Swapam`}</title>
        <meta name="description" content={`View ${user.firstName}'s profile on Swapam. ${user.totalSwaps} swaps completed, ${user.points} points earned.`} />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Header */}
          <Card sx={{ mb: 4, overflow: 'visible' }}>
            <Box
              sx={{
                height: 200,
                background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -60,
                  left: 40,
                  display: 'flex',
                  alignItems: 'end',
                  gap: 3,
                }}
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' },
                      }}
                    >
                      <PhotoCamera fontSize="small" />
                    </IconButton>
                  }
                >
                  <Avatar
                    src={user.avatar}
                    sx={{
                      width: 120,
                      height: 120,
                      border: '4px solid white',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    {user.firstName[0]}{user.lastName[0]}
                  </Avatar>
                </Badge>
                
                <Box sx={{ pb: 2, color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {user.firstName} {user.lastName}
                    </Typography>
                    {user.isVerified && (
                      <Verified color="primary" sx={{ bgcolor: 'white', borderRadius: '50%' }} />
                    )}
                  </Box>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    @{user.username}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  display: 'flex',
                  gap: 1,
                }}
              >
                <IconButton
                  onClick={() => setShareDialogOpen(true)}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
                  }}
                >
                  <Share />
                </IconButton>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={() => setEditDialogOpen(true)}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
            </Box>

            <CardContent sx={{ pt: 8 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" paragraph>
                      {user.bio || 'Passionate about sustainable living and the circular economy. Join me in turning waste into wealth!'}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <School fontSize="small" color="action" />
                        <Typography variant="body2">{user.campus}</Typography>
                      </Box>
                      {user.department && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2">{user.department}</Typography>
                        </Box>
                      )}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarToday fontSize="small" color="action" />
                        <Typography variant="body2">
                          Joined {new Date(user.joinedAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {user.badges.slice(0, 5).map((badge) => (
                        <Chip
                          key={badge.id}
                          label={badge.name}
                          color="primary"
                          variant="outlined"
                          size="small"
                          icon={<EmojiEvents />}
                        />
                      ))}
                      {user.badges.length > 5 && (
                        <Chip
                          label={`+${user.badges.length - 5} more`}
                          variant="outlined"
                          size="small"
                        />
                      )}
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      Sustainability Score
                    </Typography>
                    <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                      <Box
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: '50%',
                          background: `conic-gradient(#00C853 ${user.sustainabilityScore * 3.6}deg, #E0E0E0 0deg)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            bgcolor: 'background.paper',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography variant="h4" color="primary">
                            {user.sustainabilityScore}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Keep swapping to improve your score!
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                  {user.points.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Points
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h3" color="success.main" sx={{ fontWeight: 700 }}>
                  {user.totalSwaps}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Items Swapped
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <Typography variant="h3" color="warning.main" sx={{ fontWeight: 700 }}>
                    {user.rating.toFixed(1)}
                  </Typography>
                  <Star color="warning" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Average Rating
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h3" color="info.main" sx={{ fontWeight: 700 }}>
                  {user.badges.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Badges Earned
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Progress to Next Badge */}
          {nextBadge.needed > 0 && (
            <Card sx={{ mb: 4, p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Progress to {nextBadge.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={((user.totalSwaps % 25) / 25) * 100}
                  sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {nextBadge.needed} more swaps
                </Typography>
              </Box>
            </Card>
          )}

          {/* Tabs */}
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={(_, newValue) => setTabValue(newValue)}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Activity" />
                <Tab label="Reviews" />
                <Tab label="Badges" />
                <Tab label="Impact" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ height: 400 }}>
                <Line data={activityData} options={chartOptions} />
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <List>
                {[1, 2, 3].map((review) => (
                  <React.Fragment key={review}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar>U</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle2">User {review}</Typography>
                            <Box sx={{ display: 'flex' }}>
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} sx={{ fontSize: 16, color: 'warning.main' }} />
                              ))}
                            </Box>
                          </Box>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            Great swapper! Item was exactly as described and the transaction was smooth.
                          </Typography>
                        }
                      />
                    </ListItem>
                    {review < 3 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Grid container spacing={2}>
                {user.badges.map((badge) => (
                  <Grid item xs={12} sm={6} md={4} key={badge.id}>
                    <Card sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ mb: 1 }}>
                        {badge.icon}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {badge.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {badge.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                        Earned {new Date(badge.earnedAt).toLocaleDateString()}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 3, textAlign: 'center' }}>
                    <Eco sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                    <Typography variant="h4" color="success.main" gutterBottom>
                      {user.sustainabilityImpact?.co2Saved || 0}kg
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      CO₂ Emissions Saved
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 3, textAlign: 'center' }}>
                    <TrendingUp sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h4" color="primary.main" gutterBottom>
                      {user.sustainabilityImpact?.wasteReduced || 0}kg
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Waste Reduced
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </Card>
        </motion.div>

        {/* Edit Profile Dialog */}
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={editForm.firstName}
                  onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={editForm.lastName}
                  onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  multiline
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSave} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Share Dialog */}
        <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
          <DialogTitle>Share Profile</DialogTitle>
          <DialogContent>
            <Typography variant="body2" gutterBottom>
              Share your Swapam profile with others:
            </Typography>
            <TextField
              fullWidth
              value={`${window.location.origin}/users/${user.id}`}
              InputProps={{ readOnly: true }}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShareDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleShare} variant="contained">Share</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default ProfilePage;