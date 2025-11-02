import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Paper,
} from '@mui/material';
import { Message } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface ChatBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isOwn,
  showAvatar = true,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isOwn ? 'flex-end' : 'flex-start',
        mb: 1,
        alignItems: 'flex-end',
      }}
    >
      {!isOwn && showAvatar && (
        <Avatar
          src={message.sender.avatar}
          sx={{ width: 32, height: 32, mr: 1 }}
        >
          {message.sender.name.charAt(0)}
        </Avatar>
      )}
      
      <Box sx={{ maxWidth: '70%' }}>
        <Paper
          sx={{
            p: 1.5,
            backgroundColor: isOwn ? 'primary.main' : 'grey.100',
            color: isOwn ? 'primary.contrastText' : 'text.primary',
            borderRadius: 2,
            borderBottomRightRadius: isOwn ? 0.5 : 2,
            borderBottomLeftRadius: isOwn ? 2 : 0.5,
          }}
        >
          <Typography variant="body2">
            {message.content}
          </Typography>
        </Paper>
        
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: 'block',
            textAlign: isOwn ? 'right' : 'left',
            mt: 0.5,
            px: 1,
          }}
        >
          {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
        </Typography>
      </Box>
      
      {isOwn && showAvatar && (
        <Avatar
          src={message.sender.avatar}
          sx={{ width: 32, height: 32, ml: 1 }}
        >
          {message.sender.name.charAt(0)}
        </Avatar>
      )}
    </Box>
  );
};

export default ChatBubble;