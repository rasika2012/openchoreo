import { TextInput } from './TextInput';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    fullWidth: {
      control: 'boolean',
      description: 'If true, the text input will be full width',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Size of the text input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display',
    },
    label: {
      control: 'text',
      description: 'Label for the text input',
    },
    value: {
      control: 'text',
      description: 'Current value of the text input',
    },
    tooltip: {
      control: 'text',
      description: 'Optional tooltip text',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the component',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when text changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: 'Input Label',
    value: '',
    onChange: (value: string) => console.log('Value changed:', value),
  },
};

export const WithTooltip: Story = {
  args: {
    label: 'Input with Tooltip',
    value: '',
    tooltip: 'This is a helpful tooltip',
    onChange: (value: string) => console.log('Value changed:', value),
  },
};

export const WithError: Story = {
  args: {
    label: 'Input with Error',
    value: 'Invalid value',
    error: true,
    helperText: 'This field has an error',
    onChange: (value: string) => console.log('Value changed:', value),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit this',
    disabled: true,
    onChange: (value: string) => console.log('Value changed:', value),
  },
};

export const WithValue: Story = {
  args: {
    label: 'Filled Input',
    value: 'This is some text',
    onChange: (value: string) => console.log('Value changed:', value),
  },
};
