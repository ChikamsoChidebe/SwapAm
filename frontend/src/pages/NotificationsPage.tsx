import React, { useEffect } from 'react';
import { Container, Card, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, IconButton, Box, Chip } from '@mui/material';
import { Delete, MarkEmailRead } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchNotifications, markAsRead } from '../store/slices/notificationsSlice';

const NotificationsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notifications, loading } = useAppSelector(state => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>

      <Card>
        <List>
          {notifications.map((notification, index) => (
            <ListItem
              key={notification.id}
              sx={{
                bgcolor: notification.isRead ? 'transparent' : 'action.hover',
                borderBottom: index < notifications.length - 1 ? 1 : 0,
                borderColor: 'divider',
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  {notification.type[0].toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1">{notification.title}</Typography>
                    {!notification.isRead && (
                      <Chip label="New" color="primary" size="small" />
                    )}
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(notification.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                }
              />
              <Box>
                {!notification.isRead && (
                  <IconButton onClick={() => handleMarkAsRead(notification.id)}>
                    <MarkEmailRead />
                  </IconButton>
                )}
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Card>
    </Container>
  );
};

export default NotificationsPage;