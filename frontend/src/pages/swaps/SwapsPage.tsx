import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box, Chip, Avatar, Tab, Tabs } from '@mui/material';
import { SwapHoriz, CheckCircle, Cancel, Schedule } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchSwaps } from '../../store/slices/swapsSlice';
import { SwapStatus } from '../../types';

const SwapsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { swaps, loading } = useAppSelector(state => state.swaps);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    dispatch(fetchSwaps());
  }, [dispatch]);

  const getStatusColor = (status: SwapStatus) => {
    switch (status) {
      case SwapStatus.COMPLETED: return 'success';
      case SwapStatus.CANCELLED: return 'error';
      case SwapStatus.PENDING: return 'warning';
      default: return 'primary';
    }
  };

  const getStatusIcon = (status: SwapStatus) => {
    switch (status) {
      case SwapStatus.COMPLETED: return <CheckCircle />;
      case SwapStatus.CANCELLED: return <Cancel />;
      default: return <Schedule />;
    }
  };

  const filteredSwaps = swaps.filter(swap => {
    switch (tabValue) {
      case 0: return true; // All
      case 1: return [SwapStatus.INITIATED, SwapStatus.NEGOTIATING].includes(swap.status);
      case 2: return swap.status === SwapStatus.COMPLETED;
      case 3: return swap.status === SwapStatus.CANCELLED;
      default: return true;
    }
  });

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">My Swaps</Typography>
        <Button variant="contained" onClick={() => navigate('/browse')}>
          Find Items to Swap
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="All" />
          <Tab label="Active" />
          <Tab label="Completed" />
          <Tab label="Cancelled" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {filteredSwaps.map((swap) => (
          <Grid item xs={12} key={swap.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <SwapHoriz color="primary" />
                    <Typography variant="h6">
                      Swap with {swap.recipient.firstName} {swap.recipient.lastName}
                    </Typography>
                  </Box>
                  <Chip
                    label={swap.status}
                    color={getStatusColor(swap.status) as any}
                    icon={getStatusIcon(swap.status)}
                  />
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={5}>
                    <Typography variant="subtitle2" gutterBottom>Your Items</Typography>
                    {swap.initiatorItems.map((item) => (
                      <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <img
                          src={item.images[0]?.thumbnail || '/placeholder.jpg'}
                          alt={item.title}
                          style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
                        />
                        <Typography variant="body2">{item.title}</Typography>
                      </Box>
                    ))}
                  </Grid>

                  <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SwapHoriz sx={{ fontSize: 40, color: 'primary.main' }} />
                  </Grid>

                  <Grid item xs={12} md={5}>
                    <Typography variant="subtitle2" gutterBottom>Their Items</Typography>
                    {swap.recipientItems.map((item) => (
                      <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <img
                          src={item.images[0]?.thumbnail || '/placeholder.jpg'}
                          alt={item.title}
                          style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
                        />
                        <Typography variant="body2">{item.title}</Typography>
                      </Box>
                    ))}
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Created {new Date(swap.createdAt).toLocaleDateString()}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/swaps/${swap.id}`)}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SwapsPage;