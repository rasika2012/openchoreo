import type { Meta, StoryObj } from '@storybook/react';
import { CardDropdown } from './CardDropdown';
import { Box, Grid, Typography } from '@mui/material';
import { Card, CardContent } from '../index copy';
import Bitbucket from '@design-system/Images/generated/Bitbucket';
import { CardDropdownMenuItemCreate } from './CardDropdownMenuItemCreate/CardDropdownMenuItemCreate';
import CardDropdownMenuItem from './CardDropdownMenuItem';
import NoData from '@design-system/Images/generated/NoData';
import { useState } from 'react';

const meta: Meta<typeof CardDropdown> = {
  title: 'Choreo DS/CardDropdown',
  component: CardDropdown,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CardDropdown>;

export const Default: Story = {
  args: {
    children: 'CardDropdown Content',
  },
  render: function RenderCardDropdown(_args) {
    const [selectedItem, setSelectedItem] = useState(0);
    const handleCreate = () => {};

    const handleClick = (selectedNo: number) => {
      setSelectedItem(selectedNo);
    };
    return (
      <Box p={3}>
        <Card testId="dropdown">
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 12 }}>
                <CardDropdown
                  icon={<Bitbucket />}
                  text="Authorized Via bitbucket"
                  testId="bitbucket"
                  fullHeight
                >
                  <CardDropdownMenuItemCreate
                    createText="Create"
                    onClick={handleCreate}
                    testId="create"
                  />
                  <CardDropdownMenuItem
                    selected={selectedItem === 1}
                    // button
                    onClick={() => handleClick(1)}
                  >
                    Profile
                  </CardDropdownMenuItem>
                  <CardDropdownMenuItem
                    selected={selectedItem === 2}
                    // button
                    onClick={() => handleClick(2)}
                  >
                    My account
                  </CardDropdownMenuItem>
                  <CardDropdownMenuItem
                    selected={selectedItem === 3}
                    // button
                    onClick={() => handleClick(3)}
                  >
                    Logout
                  </CardDropdownMenuItem>
                </CardDropdown>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CardDropdown
                  icon={<Bitbucket />}
                  text="Authorized Via bitbucket"
                  active
                  testId="bitbucket"
                  fullHeight
                >
                  <CardDropdownMenuItem
                    selected={selectedItem === 1}
                    // button
                    onClick={() => handleClick(1)}
                  >
                    Profile
                  </CardDropdownMenuItem>
                  <CardDropdownMenuItem
                    selected={selectedItem === 2}
                    // button
                    onClick={() => handleClick(2)}
                  >
                    My account
                  </CardDropdownMenuItem>
                  <CardDropdownMenuItem
                    selected={selectedItem === 3}
                    // button
                    onClick={() => handleClick(3)}
                  >
                    Logout
                  </CardDropdownMenuItem>
                </CardDropdown>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Box mt={3}>
                  <Typography variant="h5">No data message</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CardDropdown
                  icon={<Bitbucket />}
                  text="Authorized Via bitbucket"
                  active
                  testId="bitbucket"
                  fullHeight
                >
                  {/* <NoDataMessage
                  size="sm"
                  message="No App passwords are configured. Contact the admin for assistance."
                  testId="card-dropdown"
                /> */}
                  <NoData />
                </CardDropdown>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    );
  },
};
