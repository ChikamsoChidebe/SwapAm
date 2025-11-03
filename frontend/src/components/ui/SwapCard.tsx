import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  Button,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  SwapHoriz,
  AccessTime,
  CheckCircle,
  Cancel,
  Pending,
  Message,
  Visibility,
} from '@mui/icons-material';
import { Swap, SwapStatus } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface SwapCardProps {
  swap: Swap;
  currentUserId: string;
  onViewDetails?: (swap: Swap) => void;
  onAccept?: (swapId: string) => void;
  onReject?: (swapId: string) => void;
  onMessage?: (swap: Swap) => void;
  variant?: 'default' | 'compact';
}

const SwapCard: React.FC<SwapCardProps> = ({
  swap,
  currentUserId,
  onViewDetails,
  onAccept,
  onReject,
  onMessage,
  variant = 'default',
}) => {
  const isInitiator = (swap.initiatorId || swap.initiator.id) === currentUserId;
  const otherUser = isInitiator ? swap.recipient : swap.initiator;
  const myItem = isInitiator ? (swap.initiatorItem || swap.initiatorItems[0]) : (swap.recipientItem || swap.recipientItems[0]);
  const theirItem = isInitiator ? (swap.recipientItem || swap.recipientItems[0]) : (swap.initiatorItem || swap.initiatorItems[0]);

  const getStatusColor = (status: SwapStatus) => {
    switch (status) {
      case SwapStatus.PENDING: return 'warning';
      case SwapStatus.ACCEPTED: return 'success';
      case SwapStatus.REJECTED: return 'error';
      case SwapStatus.COMPLETED: return 'primary';
      case SwapStatus.CANCELLED: return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: SwapStatus) => {
    switch (status) {
      case SwapStatus.PENDING: return <Pending />;
      case SwapStatus.ACCEPTED: return <CheckCircle />;
      case SwapStatus.REJECTED: return <Cancel />;
      case SwapStatus.COMPLETED: return <CheckCircle />;
      case SwapStatus.CANCELLED: return <Cancel />;
      default: return <Pending />;
    }
  };

  const canAcceptOrReject = swap.status === SwapStatus.PENDING && !isInitiator;

  if (variant === 'compact') {
    return (
      <Card sx={{ mb: 1 }}>
        <CardContent sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Avatar src={otherUser.avatar || undefined} sx={{ width: 32, height: 32, mr: 2 }}>
                {(otherUser.name || otherUser.firstName)?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle2">
                  {isInitiator ? 'Swap with' : 'Swap from'} {otherUser.name || `${otherUser.firstName} ${otherUser.lastName}`}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {myItem.title} ↔ {theirItem.title}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                icon={getStatusIcon(swap.status)}
                label={swap.status}
                size="small"
                color={getStatusColor(swap.status) as any}
              />
              <IconButton size="small" onClick={() => onViewDetails?.(swap)}>
                <Visibility />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={otherUser.avatar || undefined} sx={{ width: 40, height: 40, mr: 2 }}>
              {(otherUser.name || otherUser.firstName)?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6">
                {isInitiator ? 'Swap with' : 'Swap from'} {otherUser.name || `${otherUser.firstName} ${otherUser.lastName}`}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <AccessTime fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                  {formatDistanceToNow(new Date(swap.createdAt), { addSuffix: true })}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Chip 
            icon={getStatusIcon(swap.status)}
            label={swap.status.toUpperCase()}
            color={getStatusColor(swap.status) as any}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Box
              component="img"
              src={typeof myItem.images[0] === 'string' ? myItem.images[0] : myItem.images[0]?.url || '/placeholder-image.jpg'}
              alt={myItem.title}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: 1,
                mb: 1,
              }}
            />
            <Typography variant="subtitle2" noWrap>
              {myItem.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ${myItem.estimatedValue}
            </Typography>
          </Box>

          <Box sx={{ mx: 2, display: 'flex', alignItems: 'center' }}>
            <SwapHoriz color="primary" fontSize="large" />
          </Box>

          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Box
              component="img"
              src={typeof theirItem.images[0] === 'string' ? theirItem.images[0] : theirItem.images[0]?.url || '/placeholder-image.jpg'}
              alt={theirItem.title}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: 1,
                mb: 1,
              }}
            />
            <Typography variant="subtitle2" noWrap>
              {theirItem.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ${theirItem.estimatedValue}
            </Typography>
          </Box>
        </Box>

        {(swap.message || swap.messages?.length > 0) && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              "{swap.message || swap.messages?.[0]?.content || 'No message'}"
            </Typography>
          </>
        )}

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {canAcceptOrReject && (
              <>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  startIcon={<CheckCircle />}
                  onClick={() => onAccept?.(swap.id)}
                >
                  Accept
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<Cancel />}
                  onClick={() => onReject?.(swap.id)}
                >
                  Reject
                </Button>
              </>
            )}
            
            <Button
              variant="outlined"
              size="small"
              onClick={() => onViewDetails?.(swap)}
            >
              View Details
            </Button>
          </Box>

          <Box>
            <Tooltip title="Send Message">
              <IconButton onClick={() => onMessage?.(swap)}>
                <Message />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SwapCard;