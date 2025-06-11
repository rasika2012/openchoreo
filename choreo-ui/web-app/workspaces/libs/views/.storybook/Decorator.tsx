// import { Box, FormControl, Radio, RadioGroup, FormControlLabel, IconButton, Container, Card } from '@mui/material';
import React, { useState } from 'react';
import { Decorator } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode'
import { ThemeProvider } from '@open-choreo/design-system';
import './fonts/fonts.css'

export const withTheme: Decorator = (Story) => {
  const isDark = useDarkMode();

  return (
    <ThemeProvider mode={isDark ? 'dark' : 'light'}>
      <Story />
    </ThemeProvider>
  );
}; 