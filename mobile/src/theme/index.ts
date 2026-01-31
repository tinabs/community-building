import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0891b2', // cyan-600
    secondary: '#06b6d4', // cyan-500
    accent: '#14b8a6', // teal-500
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    error: '#ef4444',
    success: '#10b981',
  },
};

export const colors = {
  primary: '#0891b2',
  secondary: '#06b6d4',
  accent: '#14b8a6',
  background: '#ffffff',
  surface: '#f9fafb',
  text: {
    primary: '#111827',
    secondary: '#6b7280',
    light: '#9ca3af',
  },
  border: '#e5e7eb',
  error: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
};
