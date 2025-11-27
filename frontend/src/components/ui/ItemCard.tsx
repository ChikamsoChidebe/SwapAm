import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Avatar,
  Button,
  Badge,
  Tooltip,
  Skeleton,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Share,
  LocationOn,
  AccessTime,
  Verified,
  Star,
  SwapHoriz,
  MonetizationOn,
  CardGiftcard,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface ItemCardProps {
  id: string;
  title: string;
  description: string;
  price?: number;
  category: string;
  condition: string;
  images: string[];
  location: string;
  createdAt: string;
  type: 'swap' | 'sell' | 'donate';
  owner: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    isVerified?: boolean;
  };
  isFavorited?: boolean;
  isLoading?: boolean;
  onFavorite?: (id: string) => void;
  onShare?: (id: string) => void;
  onClick?: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  title,
  description,
  price,
  category,
  condition,
  images,
  location,
  createdAt,
  type,
  owner,
  isFavorited = false,
  isLoading = false,
  onFavorite,
  onShare,
  onClick,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite?.(id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(id);
  };

  const handleClick = () => {
    onClick?.(id);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'new': return 'success';
      case 'like new': return 'info';
      case 'good': return 'primary';
      case 'fair': return 'warning';
      case 'poor': return 'error';
      default: return 'default';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'swap': return <SwapHoriz />;
      case 'sell': return <MonetizationOn />;
      case 'donate': return <CardGiftcard />;
      default: return <SwapHoriz />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'swap': return '#2196F3';
      case 'sell': return '#4CAF50';
      case 'donate': return '#FF9800';
      default: return '#2196F3';
    }
  };

  if (isLoading) {
    return (
      <Card sx={{ maxWidth: 345, borderRadius: 2 }}>
        <Skeleton variant="rectangular" height={200} />
        <CardContent>
          <Skeleton variant="text" height={32} />
          <Skeleton variant="text" height={20} width="80%" />
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card
        sx={{
          maxWidth: 345,
          cursor: 'pointer',
          borderRadius: 2,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            '& .item-overlay': {
              opacity: 1,
            },
          },
        }}
        onClick={handleClick}
      >
        <Box sx={{ position: 'relative' }}>
          {!imageLoaded && !imageError && (
            <Skeleton variant="rectangular" height={200} />
          )}
          
          <CardMedia
            component="img"
            height="200"
            image={imageError ? '/placeholder-image.jpg' : (images[0] || '/placeholder-image.jpg')}
            alt={title}
            sx={{
              objectFit: 'cover',
              display: imageLoaded || imageError ? 'block' : 'none',
            }}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          
          {/* Overlay for hover effects */}
          <Box
            className="item-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }}
          />
          
          {/* Action buttons overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              display: 'flex',
              gap: 1,
            }}
          >
            <Tooltip title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}>
              <IconButton
                size="small"
                onClick={handleFavorite}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,1)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {isFavorited ? (
                  <Favorite sx={{ color: 'error.main' }} />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Share item">
              <IconButton
                size="small"
                onClick={handleShare}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,1)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Share />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Type badge */}
          <Chip
            icon={getTypeIcon()}
            label={type.toUpperCase()}
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: getTypeColor(),
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
              '& .MuiChip-icon': {
                color: 'white',
              },
            }}
          />

          {/* Price badge */}
          {price && type === 'sell' && (
            <Chip
              label={`₦${price.toLocaleString()}`}
              sx={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                backgroundColor: 'rgba(0,0,0,0.8)',
                color: 'white',
                fontWeight: 600,
                backdropFilter: 'blur(10px)',
              }}
            />
          )}
        </Box>

        <CardContent sx={{ p: 2 }}>
          {/* Category and condition */}
          <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
            <Chip
              label={category}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
            <Chip
              label={condition}
              size="small"
              color={getConditionColor(condition) as any}
              sx={{ fontSize: '0.75rem' }}
            />
          </Box>

          {/* Title */}
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.4,
            }}
          >
            {description}
          </Typography>

          {/* Location and time */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 2,
              color: 'text.secondary',
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOn sx={{ fontSize: '1rem' }} />
              <Typography variant="caption">{location}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTime sx={{ fontSize: '1rem' }} />
              <Typography variant="caption">{formatTimeAgo(createdAt)}</Typography>
            </Box>
          </Box>

          {/* Owner info */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  owner.isVerified ? (
                    <Verified sx={{ fontSize: '1rem', color: 'primary.main' }} />
                  ) : null
                }
              >
                <Avatar
                  src={owner.avatar}
                  sx={{ width: 32, height: 32 }}
                >
                  {owner.name.charAt(0).toUpperCase()}
                </Avatar>
              </Badge>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {owner.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Star sx={{ fontSize: '0.8rem', color: '#FFD700' }} />
                  <Typography variant="caption" color="text.secondary">
                    {owner.rating.toFixed(1)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Button
              variant="outlined"
              size="small"
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                minWidth: 'auto',
                px: 2,
              }}
            >
              View
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ItemCard;