import React, { useEffect } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Box, Chip, IconButton } from '@mui/material';
import { Edit, Delete, Visibility, TrendingUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchItems, deleteItem } from '../../store/slices/itemsSlice';

const MyItemsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, loading } = useAppSelector(state => state.items);
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchItems({ owner: user?.id }));
  }, [dispatch, user]);

  const handleDelete = async (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await dispatch(deleteItem(itemId));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">My Items</Typography>
        <Button variant="contained" onClick={() => navigate('/upload')}>
          Upload New Item
        </Button>
      </Box>

      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={item.images[0]?.url || '/placeholder.jpg'}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom noWrap>
                  {item.title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Chip label={`${item.points} points`} color="primary" size="small" />
                  <Chip label={item.status} variant="outlined" size="small" />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Visibility fontSize="small" color="action" />
                  <Typography variant="caption">{item.views} views</Typography>
                  <TrendingUp fontSize="small" color="action" />
                  <Typography variant="caption">{item.likes} likes</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small" onClick={() => navigate(`/items/${item.id}/edit`)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(item.id)} color="error">
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyItemsPage;