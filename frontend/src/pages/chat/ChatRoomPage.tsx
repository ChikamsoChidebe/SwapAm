import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Paper, Avatar, Typography, TextField, IconButton, Divider } from '@mui/material';
import { Send, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
}

const ChatRoomPage: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const messages: Message[] = [
    { id: '1', text: 'Hi! I saw your laptop listing', sender: 'other', timestamp: '10:30 AM' },
    { id: '2', text: 'Yes, it\'s still available!', sender: 'me', timestamp: '10:32 AM' },
    { id: '3', text: 'Is the laptop still available?', sender: 'other', timestamp: '10:35 AM' },
    { id: '4', text: 'Can we meet tomorrow?', sender: 'me', timestamp: '10:40 AM' },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 2, height: 'calc(100vh - 100px)' }}>
      <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => navigate('/chat')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Avatar sx={{ mr: 2 }}>J</Avatar>
          <Typography variant="h6">John Doe</Typography>
        </Box>

        {/* Messages */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                mb: 2
              }}
            >
              <Box
                sx={{
                  maxWidth: '70%',
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: msg.sender === 'me' ? 'primary.main' : 'grey.100',
                  color: msg.sender === 'me' ? 'white' : 'text.primary'
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 0.5 }}>
                  {msg.timestamp}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Input */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <IconButton color="primary" onClick={handleSendMessage}>
              <Send />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatRoomPage;