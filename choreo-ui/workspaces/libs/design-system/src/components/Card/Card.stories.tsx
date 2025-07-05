import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import type { CardProps } from './Card';
import { Box, Typography } from '@mui/material';
import { CardHeading } from './SubComponents/CardHeading';
import { CardContent } from './SubComponents/CardContent';
import { CardActions } from './SubComponents/CardActions';
import { CardActionArea } from './SubComponents/CardActionArea';
import { Button } from '@design-system/components';

const meta: Meta<CardProps> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ width: '300px', p: 2.5 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const DemoContent = (props: { text: string }) => {
  return (
    <CardContent testId="default-card-content">
      <Typography>{props.text}</Typography>
    </CardContent>
  );
};

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeading testId="default-card-heading" title="Card Title" />
        <CardContent testId="default-card-content">Default Card</CardContent>
        <CardActions testId="default-card-actions">
          <Button
            variant="contained"
            color="secondary"
            testId="btn-action-secondary"
          >
            Action
          </Button>
          <Button
            variant="contained"
            color="primary"
            testId="btn-action-primary"
          >
            Action
          </Button>
        </CardActions>
      </>
    ),
    testId: 'default-card',
  },
};

export const WithBorderRadius: Story = {
  args: {
    children: <DemoContent text="Card with Different Border Radius" />,
    testId: 'border-radius-card',
    borderRadius: 'lg',
  },
};

export const WithBoxShadow: Story = {
  args: {
    children: <DemoContent text="Card with Dark Shadow" />,
    testId: 'shadow-card',
    boxShadow: 'dark',
  },
};

export const SecondaryBackground: Story = {
  args: {
    children: <DemoContent text="Card with Secondary Background" />,
    testId: 'secondary-bg-card',
    bgColor: 'secondary',
  },
};

export const DisabledCard: Story = {
  args: {
    children: <DemoContent text="Disabled Card" />,
    testId: 'disabled-card',
    disabled: true,
  },
};

export const FullHeight: Story = {
  args: {
    children: <DemoContent text="Full Height Card" />,
    testId: 'full-height-card',
    fullHeight: true,
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '300px', height: '400px', p: 2.5 }}>
        <Story />
      </Box>
    ),
  ],
};

export const OutlinedVariant: Story = {
  args: {
    children: <DemoContent text="Outlined Card" />,
    testId: 'outlined-card',
    variant: 'outlined',
  },
};

export const WithSubComponents: Story = {
  args: {
    testId: 'card-with-subcomponents',
    children: (
      <>
        <CardHeading
          title="Card Title"
          onClose={() => console.log('close clicked')}
          testId="card-heading"
        />
        <CardContent testId="card-content" paddingSize="lg">
          <Typography>
            This is an example of a card with all subcomponents including
            heading, content, and actions.
          </Typography>
        </CardContent>
        <CardActions testId="card-actions">
          <Button variant="contained" color="primary" testId="btn-action">
            Action
          </Button>
        </CardActions>
      </>
    ),
  },
};

export const ClickableCard: Story = {
  args: {
    testId: 'clickable-card',
    children: (
      <CardActionArea
        testId="card-action-area"
        onClick={() => console.log('card clicked')}
      >
        <CardContent testId="card-content" paddingSize="md">
          <Typography variant="h6">Clickable Card</Typography>
          <Typography>
            Click anywhere on this card to trigger an action
          </Typography>
        </CardContent>
      </CardActionArea>
    ),
  },
};

export const OutlinedClickableCard: Story = {
  args: {
    testId: 'outlined-clickable-card',
    variant: 'outlined',
    children: (
      <CardActionArea
        testId="card-action-area"
        variant="outlined"
        onClick={() => console.log('card clicked')}
      >
        <CardContent testId="card-content" paddingSize="md">
          <Typography variant="h6">Outlined Clickable Card</Typography>
          <Typography>An outlined variant of the clickable card</Typography>
        </CardContent>
      </CardActionArea>
    ),
  },
};
