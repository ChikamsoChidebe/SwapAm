import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Avatar,
  Rating,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Share,
  LocationOn,
  AccessTime,
} from '@mui/icons-material';
import { Item } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface ItemCardProps {
  item: Item;
  onItemClick?: (item: Item) => void;
  onFavoriteClick?: (itemId: string) => void;
  onShareClick?: (item: Item) => void;
  isFavorited?: boolean;
  showOwner?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onItemClick,
  onFavoriteClick,
  onShareClick,
  isFavorited = false,
  showOwner = true,
  variant = 'default',
}) => {
  const handleCardClick = () => {
    onItemClick?.(item);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteClick?.(item.id);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShareClick?.(item);
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'excellent': return 'success';
      case 'good': return 'primary';
      case 'fair': return 'warning';
      case 'poor': return 'error';
      default: return 'default';
    }
  };

  if (variant === 'compact') {
    return (
      <Card 
        sx={{ 
          cursor: 'pointer',
          '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
          transition: 'all 0.2s ease-in-out',
          height: 200,
        }}
        onClick={handleCardClick}
      >
        <Box sx={{ display: 'flex', height: '100%' }}>
          <CardMedia
            component="img"
            sx={{ width: 120, objectFit: 'cover' }}
            image={typeof item.images[0] === 'string' ? item.images[0] : item.images[0]?.url || '/placeholder-image.jpg'}
            alt={item.title}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              ${item.estimatedValue}
            </Typography>
            <Chip 
              label={item.condition} 
              size="small" 
              color={getConditionColor(item.condition) as any}
              sx={{ alignSelf: 'flex-start', mb: 1 }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
              <LocationOn fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                {typeof item.location === 'string' ? item.location : item.location.name}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    );
  }

  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
        transition: 'all 0.3s ease-in-out',
        height: variant === 'detailed' ? 'auto' : 380,
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height={variant === 'detailed' ? 250 : 200}
        image={typeof item.images[0] === 'string' ? item.images[0] : item.images[0]?.url || '/placeholder-image.jpg'}
        alt={item.title}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent sx={{ pb: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {item.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, height: 40, overflow: 'hidden' }}>
          {item.description}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" color="primary">
            ${item.estimatedValue}
          </Typography>
          <Chip 
            label={item.condition} 
            size="small" 
            color={getConditionColor(item.condition) as any}
          />
        </Box>

        {variant === 'detailed' && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Rating value={4.5} precision={0.5} size="small" readOnly />
              <Typography variant="caption" sx={{ ml: 1 }}>
                (12 reviews)
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Category: {item.category}
            </Typography>
          </>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOn fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              {typeof item.location === 'string' ? item.location : item.location.name}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTime fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
              {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
            </Typography>
          </Box>
        </Box>

        {showOwner && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Avatar 
              src={item.owner.avatar || undefined} 
              sx={{ width: 24, height: 24, mr: 1 }}
            >
              {(item.owner.name || item.owner.firstName)?.charAt(0)}
            </Avatar>
            <Typography variant="caption" color="text.secondary">
              {item.owner.name || `${item.owner.firstName} ${item.owner.lastName}`}
            </Typography>
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button size="small" variant="contained" color="primary">
          View Details
        </Button>
        
        <Box>
          <IconButton size="small" onClick={handleFavoriteClick}>
            {isFavorited ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
          <IconButton size="small" onClick={handleShareClick}>
            <Share />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ItemCard;