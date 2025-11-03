import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Badge,
  Collapse,
} from '@mui/material';
import {
  Home,
  Search,
  Add,
  SwapHoriz,
  Chat,
  Person,
  Settings,
  Notifications,
  Category,
  Nature,
  Help,
  ExpandLess,
  ExpandMore,
  Dashboard,
  Inventory,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useAppSelector } from '../../store';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant?: 'permanent' | 'persistent' | 'temporary';
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, variant = 'temporary' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { unreadCount } = useAppSelector(state => state.notifications);
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const handleItemClick = (path: string) => {
    navigate(path);
    if (variant === 'temporary') {
      onClose();
    }
  };

  const handleExpandClick = (item: string) => {
    setExpandedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  const publicMenuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Browse Items', icon: <Search />, path: '/browse' },
    { text: 'Categories', icon: <Category />, path: '/categories' },
    { text: 'Sustainability', icon: <Nature />, path: '/sustainability' },
    { text: 'Help', icon: <Help />, path: '/help' },
  ];

  const authenticatedMenuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Upload Item', icon: <Add />, path: '/upload' },
    { text: 'My Items', icon: <Inventory />, path: '/my-items' },
    { text: 'Swaps', icon: <SwapHoriz />, path: '/swaps' },
    { text: 'Chat', icon: <Chat />, path: '/chat' },
    {
      text: 'Notifications',
      icon: <Notifications />,
      path: '/notifications',
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { text: 'Profile', icon: <Person />, path: '/profile' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  const drawerContent = (
    <Box sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
          }}
        >
          SWAPAM
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: 'text.secondary',
            mt: 0.5,
          }}
        >
          Turn waste into wealth
        </Typography>
      </Box>

      <List sx={{ flexGrow: 1, py: 1 }}>
        {/* Public Menu Items */}
        {publicMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleItemClick(item.path)}
              selected={isActive(item.path)}
              sx={{
                mx: 1,
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}

        {isAuthenticated && (
          <>
            <Divider sx={{ my: 1 }} />
            
            {/* Authenticated Menu Items */}
            {authenticatedMenuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleItemClick(item.path)}
                  selected={isActive(item.path)}
                  sx={{
                    mx: 1,
                    borderRadius: 2,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                    },
                  }}
                >
                  <ListItemIcon>
                    {item.badge ? (
                      <Badge badgeContent={item.badge} color="error">
                        {item.icon}
                      </Badge>
                    ) : (
                      item.icon
                    )}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}
      </List>

      {/* User Info */}
      {isAuthenticated && user && (
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 600,
              }}
            >
              {user.firstName[0]}
            </Box>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="subtitle2" noWrap>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {user.points} points
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: 280,
          borderRight: 1,
          borderColor: 'divider',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;