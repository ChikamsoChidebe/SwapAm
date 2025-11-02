import React, { useEffect } from 'react';
import { Container, Card, CardContent, Typography, Button, Box, Chip, Grid, Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/material';
import { CheckCircle, Cancel, SwapHoriz, LocalShipping } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchSwapById, acceptSwap, rejectSwap } from '../../store/slices/swapsSlice';
import { SwapStatus } from '../../types';

const SwapDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentSwap: swap, loading } = useAppSelector(state => state.swaps);
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (id) dispatch(fetchSwapById(id));
  }, [dispatch, id]);

  const handleAccept = () => {
    if (id) dispatch(acceptSwap(id));
  };

  const handleReject = () => {
    if (id) dispatch(rejectSwap(id));
  };

  if (loading || !swap) return <div>Loading...</div>;

  const canAccept = swap.status === SwapStatus.INITIATED && swap.recipient.id === user?.id;
  const canReject = [SwapStatus.INITIATED, SwapStatus.NEGOTIATING].includes(swap.status);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4">Swap Details</Typography>
            <Chip
              label={swap.status}
              color={swap.status === SwapStatus.COMPLETED ? 'success' : 'primary'}
              size="large"
            />
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Typography variant="h6" gutterBottom>
                {swap.initiator.firstName}'s Items
              </Typography>
              {swap.initiatorItems.map((item) => (
                <Card key={item.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', p: 2 }}>
                    <img
                      src={item.images[0]?.url || '/placeholder.jpg'}
                      alt={item.title}
                      style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                    />
                    <Box sx={{ ml: 2, flex: 1 }}>
                      <Typography variant="subtitle1">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                      <Chip label={`${item.points} points`} size="small" sx={{ mt: 1 }} />
                    </Box>
                  </Box>
                </Card>
              ))}
            </Grid>

            <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SwapHoriz sx={{ fontSize: 60, color: 'primary.main' }} />
            </Grid>

            <Grid item xs={12} md={5}>
              <Typography variant="h6" gutterBottom>
                {swap.recipient.firstName}'s Items
              </Typography>
              {swap.recipientItems.map((item) => (
                <Card key={item.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', p: 2 }}>
                    <img
                      src={item.images[0]?.url || '/placeholder.jpg'}
                      alt={item.title}
                      style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                    />
                    <Box sx={{ ml: 2, flex: 1 }}>
                      <Typography variant="subtitle1">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                      <Chip label={`${item.points} points`} size="small" sx={{ mt: 1 }} />
                    </Box>
                  </Box>
                </Card>
              ))}
            </Grid>
          </Grid>

          {(canAccept || canReject) && (
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              {canAccept && (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircle />}
                  onClick={handleAccept}
                >
                  Accept Swap
                </Button>
              )}
              {canReject && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Cancel />}
                  onClick={handleReject}
                >
                  Reject Swap
                </Button>
              )}
            </Box>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Timeline</Typography>
          <Timeline>
            {swap.timeline.map((event, index) => (
              <TimelineItem key={event.id}>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    {event.event === 'completed' ? <CheckCircle /> : <SwapHoriz />}
                  </TimelineDot>
                  {index < swap.timeline.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="subtitle2">{event.description}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(event.timestamp).toLocaleString()}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SwapDetailsPage;