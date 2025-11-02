import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
  Alert,
} from '@mui/material';
import {
  People,
  Inventory,
  SwapHoriz,
  TrendingUp,
  Warning,
  CheckCircle,
  Block,
  Visibility,
} from '@mui/icons-material';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const AdminDashboard: React.FC = () => {
  const [stats] = useState({
    totalUsers: 5247,
    activeUsers: 3891,
    totalItems: 12456,
    activeItems: 8934,
    totalSwaps: 2847,
    completedSwaps: 2156,
    pendingReports: 23,
    revenue: 45678,
  });

  const [recentActivity] = useState([
    { id: 1, type: 'user_registered', user: 'John Doe', time: '2 minutes ago' },
    { id: 2, type: 'item_uploaded', user: 'Jane Smith', item: 'MacBook Pro', time: '5 minutes ago' },
    { id: 3, type: 'swap_completed', users: 'Mike & Sarah', time: '10 minutes ago' },
    { id: 4, type: 'report_submitted', user: 'Alex Johnson', time: '15 minutes ago' },
  ]);

  const [chartData] = useState({
    users: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'New Users',
        data: [120, 190, 300, 500, 200, 300],
        borderColor: '#00C853',
        backgroundColor: 'rgba(0, 200, 83, 0.1)',
        tension: 0.4,
      }],
    },
    categories: {
      labels: ['Books', 'Electronics', 'Clothing', 'Furniture', 'Sports'],
      datasets: [{
        data: [30, 25, 20, 15, 10],
        backgroundColor: ['#00C853', '#FF6D00', '#2196F3', '#FF9800', '#9C27B0'],
      }],
    },
    revenue: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Revenue (₦)',
        data: [5000, 7500, 12000, 15000, 18000, 22000],
        backgroundColor: 'rgba(0, 200, 83, 0.8)',
      }],
    },
  });

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Swapam</title>
      </Helmet>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>
            Admin Dashboard
          </Typography>

          {/* Alert for pending reports */}
          {stats.pendingReports > 0 && (
            <Alert severity="warning" sx={{ mb: 4 }}>
              You have {stats.pendingReports} pending reports that need attention.
              <Button color="inherit" size="small" sx={{ ml: 2 }}>
                View Reports
              </Button>
            </Alert>
          )}

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography color="textSecondary" gutterBottom>
                        Total Users
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stats.totalUsers.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        +12% from last month
                      </Typography>
                    </Box>
                    <People sx={{ fontSize: 40, color: 'primary.main' }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography color="textSecondary" gutterBottom>
                        Active Items
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stats.activeItems.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        +8% from last month
                      </Typography>
                    </Box>
                    <Inventory sx={{ fontSize: 40, color: 'info.main' }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography color="textSecondary" gutterBottom>
                        Completed Swaps
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stats.completedSwaps.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        +15% from last month
                      </Typography>
                    </Box>
                    <SwapHoriz sx={{ fontSize: 40, color: 'success.main' }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography color="textSecondary" gutterBottom>
                        Revenue
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        ₦{stats.revenue.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        +23% from last month
                      </Typography>
                    </Box>
                    <TrendingUp sx={{ fontSize: 40, color: 'warning.main' }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Charts */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    User Growth
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <Line data={chartData.users} options={{ responsive: true, maintainAspectRatio: false }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Item Categories
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <Doughnut data={chartData.categories} options={{ responsive: true, maintainAspectRatio: false }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* Recent Activity */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recent Activity
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Activity</TableCell>
                          <TableCell>Time</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {recentActivity.map((activity) => (
                          <TableRow key={activity.id}>
                            <TableCell>
                              <Box>
                                <Typography variant="body2">
                                  {activity.type === 'user_registered' && `${activity.user} registered`}
                                  {activity.type === 'item_uploaded' && `${activity.user} uploaded ${activity.item}`}
                                  {activity.type === 'swap_completed' && `Swap completed between ${activity.users}`}
                                  {activity.type === 'report_submitted' && `Report submitted by ${activity.user}`}
                                </Typography>
                                <Chip
                                  label={activity.type.replace('_', ' ')}
                                  size="small"
                                  color={
                                    activity.type === 'report_submitted' ? 'error' :
                                    activity.type === 'swap_completed' ? 'success' : 'primary'
                                  }
                                />
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="caption" color="textSecondary">
                                {activity.time}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <IconButton size="small">
                                <Visibility />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Revenue Chart */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Monthly Revenue
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <Bar data={chartData.revenue} options={{ responsive: true, maintainAspectRatio: false }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </>
  );
};

export default AdminDashboard;