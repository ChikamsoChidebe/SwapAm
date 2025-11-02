import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Slider,
  FormControlLabel,
  Checkbox,
  Pagination,
  Skeleton,
  Fab,
  Badge,
} from '@mui/material';
import {
  FilterList,
  Search,
  ViewModule,
  ViewList,
  Favorite,
  FavoriteBorder,
  Share,
  LocationOn,
  Star,
  TrendingUp,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchItems, likeItem, setFilters } from '../../store/slices/itemsSlice';
import { ItemCategory, ItemCondition, SortOption } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const BrowsePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, loading, filters, pagination } = useAppSelector(state => state.items);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.RELEVANCE);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    dispatch(fetchItems({ page: 1, limit: 20, filters }));
  }, [dispatch, filters]);

  const handleSearch = () => {
    const newFilters = {
      ...filters,
      query: searchQuery,
      category: selectedCategories.length > 0 ? selectedCategories[0] as ItemCategory : undefined,
      condition: selectedConditions as ItemCondition[],
      priceRange: { min: priceRange[0], max: priceRange[1] },
      sortBy,
    };
    dispatch(setFilters(newFilters));
  };

  const handleLike = async (itemId: string) => {
    try {
      await dispatch(likeItem(itemId)).unwrap();
      setLikedItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
        return newSet;
      });
    } catch (error) {
      console.error('Failed to like item:', error);
    }
  };

  const handleShare = (item: any) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: `${window.location.origin}/items/${item.id}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/items/${item.id}`);
    }
  };

  const renderItemCard = (item: any, index: number) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card
        sx={{
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          },
        }}
        onClick={() => navigate(`/items/${item.id}`)}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height={viewMode === 'grid' ? 200 : 120}
            image={item.images[0]?.url || '/placeholder.jpg'}
            alt={item.title}
            sx={{ objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              display: 'flex',
              gap: 1,
            }}
          >
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleLike(item.id);
              }}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
              }}
            >
              {likedItems.has(item.id) ? (
                <Favorite color="error" />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleShare(item);
              }}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
              }}
            >
              <Share />
            </IconButton>
          </Box>
          <Chip
            label={`${item.points} points`}
            color="primary"
            size="small"
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              fontWeight: 600,
            }}
          />
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom noWrap>
            {item.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 2,
            }}
          >
            {item.description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Chip label={item.condition} variant="outlined" size="small" />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Star sx={{ fontSize: 16, color: 'warning.main' }} />
              <Typography variant="caption">
                {item.owner?.rating?.toFixed(1) || 'N/A'}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {item.location?.campus || 'Unknown'}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderFilters = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      
      {/* Categories */}
      <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
        Categories
      </Typography>
      {Object.values(ItemCategory).map((category) => (
        <FormControlLabel
          key={category}
          control={
            <Checkbox
              checked={selectedCategories.includes(category)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCategories([...selectedCategories, category]);
                } else {
                  setSelectedCategories(selectedCategories.filter(c => c !== category));
                }
              }}
            />
          }
          label={category.replace('_', ' ')}
        />
      ))}

      {/* Conditions */}
      <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
        Condition
      </Typography>
      {Object.values(ItemCondition).map((condition) => (
        <FormControlLabel
          key={condition}
          control={
            <Checkbox
              checked={selectedConditions.includes(condition)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedConditions([...selectedConditions, condition]);
                } else {
                  setSelectedConditions(selectedConditions.filter(c => c !== condition));
                }
              }}
            />
          }
          label={condition.replace('_', ' ')}
        />
      ))}

      {/* Price Range */}
      <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
        Points Range
      </Typography>
      <Slider
        value={priceRange}
        onChange={(_, newValue) => setPriceRange(newValue as number[])}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
        sx={{ mt: 2 }}
      />

      <Button
        fullWidth
        variant="contained"
        onClick={handleSearch}
        sx={{ mt: 3 }}
      >
        Apply Filters
      </Button>
    </Box>
  );

  return (
    <>
      <Helmet>
        <title>Browse Items - Swapam</title>
        <meta name="description" content="Browse thousands of items available for swap on campus. Find books, electronics, clothes and more." />
      </Helmet>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Browse Items
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Discover amazing items from your campus community
          </Typography>
        </Box>

        {/* Search and Controls */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Sort by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                {Object.values(SortOption).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option.replace('_', ' ')}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={() => setFilterDrawerOpen(true)}
                >
                  Filters
                </Button>
                <IconButton
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                >
                  {viewMode === 'grid' ? <ViewList /> : <ViewModule />}
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Items Grid */}
        <AnimatePresence>
          {loading ? (
            <Grid container spacing={3}>
              {[...Array(12)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card>
                    <Skeleton variant="rectangular" height={200} />
                    <CardContent>
                      <Skeleton variant="text" height={32} />
                      <Skeleton variant="text" height={20} />
                      <Skeleton variant="text" height={20} width="60%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={3}>
              {items.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={viewMode === 'grid' ? 6 : 12}
                  md={viewMode === 'grid' ? 4 : 12}
                  lg={viewMode === 'grid' ? 3 : 12}
                  key={item.id}
                >
                  {renderItemCard(item, index)}
                </Grid>
              ))}
            </Grid>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={pagination.totalPages}
              page={pagination.page}
              onChange={(_, page) => {
                dispatch(fetchItems({ page, limit: 20, filters }));
              }}
              color="primary"
              size="large"
            />
          </Box>
        )}

        {/* Filter Drawer */}
        <Drawer
          anchor="right"
          open={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
          PaperProps={{ sx: { width: 320 } }}
        >
          {renderFilters()}
        </Drawer>

        {/* Trending FAB */}
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
          onClick={() => navigate('/trending')}
        >
          <Badge badgeContent="🔥" color="error">
            <TrendingUp />
          </Badge>
        </Fab>
      </Container>
    </>
  );
};

export default BrowsePage;