import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import DemoBanner from '../common/DemoBanner';
import { useAppSelector, useAppDispatch } from '../../store';
import { setSidebarOpen } from '../../store/slices/uiSlice';
import { useAuth } from '../../contexts/AuthContext';

const Layout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user } = useAuth();
  const { sidebarOpen } = useAppSelector(state => state.ui);
  
  const showDemoBanner = !user && (location.pathname === '/' || location.pathname.startsWith('/browse'));

  const handleSidebarToggle = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };

  const handleSidebarClose = () => {
    dispatch(setSidebarOpen(false));
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header onMenuClick={handleSidebarToggle} />
      
      <Sidebar
        open={sidebarOpen}
        onClose={handleSidebarClose}
        variant={isMobile ? 'temporary' : 'persistent'}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          marginLeft: !isMobile && sidebarOpen ? '280px' : 0,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Box
          sx={{
            mt: '64px', // Header height
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Outlet />
        </Box>
        
        <Footer />
      </Box>
      
      {/* Demo Banner - only show on public pages when not logged in */}
      {showDemoBanner && <DemoBanner />}
    </Box>
  );
};

export default Layout;