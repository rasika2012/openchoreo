// import { Box, FormControl, Radio, RadioGroup, FormControlLabel, IconButton, Container, Card } from '@mui/material';
import React, { useState } from 'react';
import { ThemeProvider } from '../src/theme';
import { Card, CardContent } from '../src';
import { Decorator } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode'
import { Box } from '../src'
import { MemoryRouter } from 'react-router';

export const withTheme: Decorator = (Story) => {
  const isDark = useDarkMode();

  return (
    <MemoryRouter>
      <ThemeProvider mode={isDark ? 'dark' : 'light'}>
        <Box padding={20} backgroundColor='background.default'>
          <Story />
        </Box>
      </ThemeProvider>
    </MemoryRouter>
  );
}; 