import React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const ThemeProvider = ({ children }) => {
  return (
    <NextThemesProvider attribute="class">
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
