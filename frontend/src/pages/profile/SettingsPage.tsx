import React, { useState } from 'react';
import { Container, Card, Typography, Switch, FormControlLabel, Button, Box, Divider, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleTheme } from '../../store/slices/uiSlice';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(state => state.ui);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    swapUpdates: true,
    newMatches: true,
    promotions: false,
  });

  const handleNotificationChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications(prev => ({
      ...prev,
      [key]: event.target.checked,
    }));
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Card sx={{ mb: 3 }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Appearance
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Dark Mode"
                secondary="Switch between light and dark theme"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={theme === 'dark'}
                  onChange={handleThemeToggle}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Box>
      </Card>

      <Card sx={{ mb: 3 }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Email Notifications"
                secondary="Receive notifications via email"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={notifications.email}
                  onChange={handleNotificationChange('email')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Push Notifications"
                secondary="Receive push notifications on your device"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={notifications.push}
                  onChange={handleNotificationChange('push')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Swap Updates"
                secondary="Get notified about swap status changes"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={notifications.swapUpdates}
                  onChange={handleNotificationChange('swapUpdates')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="New Matches"
                secondary="Get notified when new items match your interests"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={notifications.newMatches}
                  onChange={handleNotificationChange('newMatches')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Promotions"
                secondary="Receive promotional offers and updates"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={notifications.promotions}
                  onChange={handleNotificationChange('promotions')}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Box>
      </Card>

      <Card>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Account
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button variant="outlined" color="primary">
              Change Password
            </Button>
            <Button variant="outlined" color="primary">
              Download My Data
            </Button>
            <Divider />
            <Button variant="outlined" color="error">
              Delete Account
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default SettingsPage;