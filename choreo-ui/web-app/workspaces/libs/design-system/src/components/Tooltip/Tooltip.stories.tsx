import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';
import { QuestionMark } from '@mui/icons-material';

const meta: Meta<typeof Tooltip> = {
  title: 'Choreo DS/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the element',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    children: 'Tooltip Content',
    title: 'This is a tooltip',
    example: 'This is an example of a tooltip',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="contained" color="primary">
        Hover me
      </Button>
    </Tooltip>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Tooltip',
    disabled: true,
  },
  render: (args) => {
    return (
      <Tooltip {...args}>
        <Button variant="contained" color="primary">
          Hover me
        </Button>
      </Tooltip>
    );
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Tooltip with icon',
    title: 'This is a tooltip with an icon',
  },
  render: (args) => {
    return (
      <Tooltip {...args}>
        <QuestionMark />
      </Tooltip>
    );
  },
};

export const ToNormalText: Story = {
  args: {
    children: 'Tooltip to normal text',
    title: 'Tooltip to normal text',
  },
  render: (args) => {
    return (
      <Tooltip {...args}>
        <span>Hover over here</span>
      </Tooltip>
    );
  },
};
