import React, { useState, useEffect } from 'react';
import { Container, TextField, Grid, Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { searchItems } from '../store/slices/itemsSlice';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { items, searchLoading } = useAppSelector(state => state.items);
  const [query, setQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    if (query) {
      dispatch(searchItems({ query }));
    }
  }, [dispatch, query]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      dispatch(searchItems({ query: value }));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search for items..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" color="text.secondary">
          {items.length} results found for "{query}"
        </Typography>
      </Box>

      {searchLoading ? (
        <Typography>Searching...</Typography>
      ) : (
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
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {item.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip label={`${item.points} points`} color="primary" />
                    <Chip label={item.condition} variant="outlined" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SearchPage;