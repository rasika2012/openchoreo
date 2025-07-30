import type { Meta, StoryObj } from '@storybook/react';
import { ComponentTypes } from './ComponentTypes';

const meta: Meta<typeof ComponentTypes> = {
  title: 'Choreo Views/ComponentTypes',
  component: ComponentTypes,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ComponentTypes>;

export const Default: Story = {
  args: {
    heading: 'Component Types',
    components: [
      { type: 'Web Application', webAppType: 'react' },
      { type: 'Web Application', webAppType: 'react' },
      { type: 'Service', webAppType: 'nodejs' },
      { type: 'Service', webAppType: 'java' },
      { type: 'Service', webAppType: 'go' },
      { type: 'Service', webAppType: 'php' },
      { type: 'Service', webAppType: 'ruby' },
    ],
  },
};

export const Disabled: Story = {
  args: {},
};
