import React, { createContext, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { setTheme, toggleTheme } from '../store/slices/uiSlice';

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeContextProvider: React.FC<{ 
  children: (props: { theme: 'light' | 'dark' }) => React.ReactNode 
}> = ({ children }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.ui.theme);

  const handleSetTheme = (newTheme: 'light' | 'dark') => {
    dispatch(setTheme(newTheme));
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const value: ThemeContextType = {
    theme,
    setTheme: handleSetTheme,
    toggleTheme: handleToggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children({ theme })}
    </ThemeContext.Provider>
  );
};