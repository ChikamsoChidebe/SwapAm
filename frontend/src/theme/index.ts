import { createTheme, ThemeOptions } from '@mui/material/styles';

export const colors = {
  primary: {
    main: '#00C853',
    light: '#5EFC82',
    dark: '#009624',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FF6D00',
    light: '#FF9E40',
    dark: '#C43E00',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#4CAF50',
    light: '#81C784',
    dark: '#388E3C',
  },
  warning: {
    main: '#FF9800',
    light: '#FFB74D',
    dark: '#F57C00',
  },
  error: {
    main: '#F44336',
    light: '#EF5350',
    dark: '#D32F2F',
  },
  info: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#1976D2',
  },
};

const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
  },
  button: {
    textTransform: 'none' as const,
    fontWeight: 600,
  },
};

const getComponentOverrides = (mode: 'light' | 'dark') => ({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        padding: '10px 24px',
        fontSize: '0.95rem',
        fontWeight: 600,
        textTransform: 'none' as const,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0, 200, 83, 0.3)',
        },
      },
      contained: {
        background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
        '&:hover': {
          background: 'linear-gradient(135deg, #009624 0%, #388E3C 100%)',
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        boxShadow: mode === 'light' 
          ? '0 2px 12px rgba(0, 0, 0, 0.08)' 
          : '0 2px 12px rgba(255, 255, 255, 0.05)',
        '&:hover': {
          boxShadow: mode === 'light' 
            ? '0 8px 24px rgba(0, 0, 0, 0.12)' 
            : '0 8px 24px rgba(255, 255, 255, 0.08)',
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 12,
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 20,
        fontWeight: 500,
      },
    },
  },
});

export const createSwapAmTheme = (mode: 'light' | 'dark') => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      ...colors,
      background: {
        default: mode === 'light' ? '#F8FFFE' : '#121212',
        paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
      },
      text: {
        primary: mode === 'light' ? '#2C3E50' : '#FFFFFF',
        secondary: mode === 'light' ? '#7F8C8D' : '#AAAAAA',
      },
    },
    typography,
    shape: {
      borderRadius: 12,
    },
    components: getComponentOverrides(mode),
  };

  return createTheme(themeOptions);
};

export default createSwapAmTheme;