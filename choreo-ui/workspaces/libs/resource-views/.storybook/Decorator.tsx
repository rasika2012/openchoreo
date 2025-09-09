// import { Box, FormControl, Radio, RadioGroup, FormControlLabel, IconButton, Container, Card } from '@mui/material';
import React, { useState } from 'react';
import { Decorator } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode'
import { ThemeProvider } from '@open-choreo/design-system';
import './fonts/fonts.css'
import { BrowserRouter } from 'react-router';
import { IntlProvider } from 'react-intl';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
dayjs.extend(relativeTime);

export const withTheme: Decorator = (Story) => {
  const isDark = useDarkMode();

  return (
    <ThemeProvider mode={isDark ? 'dark' : 'light'}>
      <BrowserRouter >
        <IntlProvider locale="en">
          <Story />
        </IntlProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}; 