import React, { useState, useEffect } from 'react';
import { Container, Card, Typography, Button, Box, Grid, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { SwapHoriz } from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchItems } from '../../store/slices/itemsSlice';
import { createSwap } from '../../store/slices/swapsSlice';

const CreateSwapPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.items);
  const { user } = useAppSelector(state => state.auth);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const targetItemId = searchParams.get('item');
  const recipientId = searchParams.get('user');

  useEffect(() => {
    dispatch(fetchItems({ owner: user?.id }));
  }, [dispatch, user]);

  const handleItemToggle = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSubmit = async () => {
    if (selectedItems.length === 0 || !recipientId) return;

    try {
      await dispatch(createSwap({
        recipientId,
        initiatorItems: selectedItems,
        recipientItems: targetItemId ? [targetItemId] : [],
        message,
      })).unwrap();
      
      navigate('/swaps');
    } catch (error) {
      console.error('Failed to create swap:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SwapHoriz color="primary" />
          Create Swap Offer
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Select items to offer:
        </Typography>

        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} key={item.id}>
              <Card sx={{ p: 2, border: selectedItems.includes(item.id) ? '2px solid #00C853' : '1px solid #e0e0e0' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleItemToggle(item.id)}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <img
                        src={item.images[0]?.thumbnail || '/placeholder.jpg'}
                        alt={item.title}
                        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }}
                      />
                      <Box>
                        <Typography variant="subtitle2">{item.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.points} points
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </Card>
            </Grid>
          ))}
        </Grid>

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ mt: 3, mb: 3 }}
          placeholder="Add a personal message to your swap offer..."
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={selectedItems.length === 0}
            startIcon={<SwapHoriz />}
          >
            Send Swap Offer
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default CreateSwapPage;