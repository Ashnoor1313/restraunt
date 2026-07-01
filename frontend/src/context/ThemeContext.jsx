import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Support theme switching for testing: 'luxury' | 'italian' | 'japanese' | 'cafe' | 'seafood'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('restaurant-theme') || 'luxury';
  });

  useEffect(() => {
    const root = document.documentElement;
    // Remove other theme classes
    root.classList.remove('theme-luxury', 'theme-italian', 'theme-japanese', 'theme-cafe', 'theme-seafood');
    // Add current theme class
    root.classList.add(`theme-${theme}`);
    localStorage.setItem('restaurant-theme', theme);
  }, [theme]);

  const changeTheme = (newTheme) => {
    if (['luxury', 'italian', 'japanese', 'cafe', 'seafood'].includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
