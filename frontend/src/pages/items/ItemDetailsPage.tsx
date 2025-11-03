import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, Typography, Button, Box, Chip, Avatar, IconButton, Dialog } from '@mui/material';
import { Favorite, Share, SwapHoriz, Star, LocationOn, Close } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchItemById } from '../../store/slices/itemsSlice';
import { motion } from 'framer-motion';

const ItemDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentItem: item, loading } = useAppSelector(state => state.items);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchItemById(id));
  }, [dispatch, id]);

  if (loading || !item) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Box sx={{ position: 'relative', mb: 2 }}>
              <img
                src={item.images[selectedImage]?.url || '/placeholder.jpg'}
                alt={item.title}
                style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 8, cursor: 'pointer' }}
                onClick={() => setImageDialogOpen(true)}
              />
              <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
                <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.9)' }}>
                  <Favorite />
                </IconButton>
                <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.9)' }}>
                  <Share />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto' }}>
              {item.images.map((img, index) => (
                <img
                  key={index}
                  src={img.thumbnail || img.url}
                  alt={`${item.title} ${index + 1}`}
                  style={{
                    width: 80, height: 80, objectFit: 'cover', borderRadius: 4,
                    cursor: 'pointer', border: selectedImage === index ? '2px solid #00C853' : 'none'
                  }}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Typography variant="h4" gutterBottom>{item.title}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip label={`${item.points} points`} color="primary" />
              <Chip label={item.condition} variant="outlined" />
              <Chip label={item.category} variant="outlined" />
            </Box>
            
            <Typography variant="body1" paragraph>{item.description}</Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar src={item.owner.avatar || undefined}>{item.owner.firstName[0]}</Avatar>
              <Box>
                <Typography variant="subtitle1">{item.owner.firstName} {item.owner.lastName}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                  <Typography variant="body2">{item.owner.rating.toFixed(1)}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ({item.owner.totalSwaps} swaps)
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <LocationOn color="action" />
              <Typography variant="body2">{item.location.campus}</Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<SwapHoriz />}
                onClick={() => navigate(`/swaps/create?item=${item.id}`)}
                sx={{ flex: 1 }}
              >
                Propose Swap
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate(`/chat/new?user=${item.owner.id}`)}
              >
                Message
              </Button>
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)} maxWidth="md" fullWidth>
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={() => setImageDialogOpen(false)}
            sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.5)', color: 'white' }}
          >
            <Close />
          </IconButton>
          <img
            src={item.images[selectedImage]?.url}
            alt={item.title}
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
      </Dialog>
    </Container>
  );
};

export default ItemDetailsPage;