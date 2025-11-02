import React, { useState } from 'react';
import { Container, Box, Grid, Paper, List, ListItem, ListItemAvatar, ListItemText, Avatar, TextField, IconButton, Typography, Divider } from '@mui/material';
import { Send, Search } from '@mui/icons-material';

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
}

const ChatPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string>('1');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const chats: Chat[] = [
    { id: '1', name: 'John Doe', avatar: '/avatars/john.jpg', lastMessage: 'Is the laptop still available?', timestamp: '2m ago', unread: 2 },
    { id: '2', name: 'Jane Smith', avatar: '/avatars/jane.jpg', lastMessage: 'Thanks for the quick swap!', timestamp: '1h ago', unread: 0 },
    { id: '3', name: 'Mike Johnson', avatar: '/avatars/mike.jpg', lastMessage: 'When can we meet?', timestamp: '3h ago', unread: 1 },
  ];

  const messages: Message[] = [
    { id: '1', text: 'Hi! I saw your laptop listing', sender: 'other', timestamp: '10:30 AM' },
    { id: '2', text: 'Yes, it\'s still available!', sender: 'me', timestamp: '10:32 AM' },
    { id: '3', text: 'Is the laptop still available?', sender: 'other', timestamp: '10:35 AM' },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="xl" sx={{ py: 3, height: 'calc(100vh - 120px)' }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        {/* Chat List */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Messages</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Box>
            <Divider />
            <List sx={{ flex: 1, overflow: 'auto' }}>
              {filteredChats.map((chat) => (
                <ListItem
                  key={chat.id}
                  button
                  selected={selectedChat === chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  sx={{ borderRadius: 1, mx: 1 }}
                >
                  <ListItemAvatar>
                    <Avatar src={chat.avatar}>{chat.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.name}
                    secondary={chat.lastMessage}
                    secondaryTypographyProps={{ noWrap: true }}
                  />
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="caption" color="text.secondary">
                      {chat.timestamp}
                    </Typography>
                    {chat.unread > 0 && (
                      <Box sx={{ 
                        bgcolor: 'primary.main', 
                        color: 'white', 
                        borderRadius: '50%', 
                        width: 20, 
                        height: 20, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        mt: 0.5,
                        ml: 'auto'
                      }}>
                        {chat.unread}
                      </Box>
                    )}
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Chat Messages */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Chat Header */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ mr: 2 }}>J</Avatar>
                <Typography variant="h6">John Doe</Typography>
              </Box>
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

            {/* Message Input */}
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatPage;