import { useState } from 'react';
import { Build } from '@open-choreo/definitions';
import type { Meta, StoryObj } from '@storybook/react';
import { BuildSelector } from './BuildSelector';

const mockBuilds = [
  {
    name: 'Build v1.0.0',
    uuid: 'build-123-456-789',
    componentName: 'api-service',
    projectName: 'my-project',
    orgName: 'my-organization',
    commit: 'abc123def456',
    status: 'completed' as const,
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    name: 'Build v1.0.1',
    uuid: 'build-234-567-890',
    componentName: 'api-service',
    projectName: 'my-project',
    orgName: 'my-organization',
    commit: 'def456ghi789',
    status: 'pending' as const,
    createdAt: '2024-01-15T11:45:00Z',
  },
  {
    name: 'Build v1.0.2',
    uuid: 'build-345-678-901',
    componentName: 'api-service',
    projectName: 'my-project',
    orgName: 'my-organization',
    commit: 'ghi789jkl012',
    status: 'failed' as const,
    createdAt: '2024-01-15T12:15:00Z',
  },
];

const meta: Meta<typeof BuildSelector> = {
  title: 'Choreo Views/BuildSelector',
  component: BuildSelector,
  argTypes: {
    builds: {
      control: 'object',
      description: 'Array of build objects to display',
    },
    onChange: {
      action: 'build-selected',
      description: 'Callback when a build is selected',
    },
    selectedBuild: {
      control: 'object',
      description: 'Currently selected build object',
    },
    open: {
      control: 'boolean',
      description: 'Whether the side panel is open',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onOpen: {
      action: 'panel-opened',
      description: 'Callback when the panel should be opened',
    },
    onCancel: {
      action: 'cancelled',
      description: 'Callback when cancel is clicked',
    },
    onSave: {
      action: 'saved',
      description: 'Callback when save is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BuildSelector>;

// Template component for stories with state management
const BuildSelectorTemplate = ({
  builds,
  selectedBuild: initialSelectedBuild,
  ...args
}: {
  builds: Build[];
  selectedBuild: Build;
  onChange?: (build: Build) => void;
  onCancel?: () => void;
  onSave?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedBuild, setSelectedBuild] = useState(initialSelectedBuild);

  return (
    <div>
      <p style={{ margin: '16px 0', fontFamily: 'system-ui' }}>
        <strong>Current External State:</strong> {selectedBuild.name} (UUID:{' '}
        {selectedBuild.uuid})
      </p>
      <BuildSelector
        {...args}
        builds={builds}
        selectedBuild={selectedBuild}
        open={open}
        onOpen={() => setOpen(true)}
        onChange={(build) => {
          setSelectedBuild(build);
        }}
        onCancel={() => setOpen(false)}
        onSave={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <BuildSelectorTemplate {...args} />,
  args: {
    builds: mockBuilds,
    selectedBuild: mockBuilds[0],
  },
};

export const WithPendingBuild: Story = {
  render: (args) => <BuildSelectorTemplate {...args} />,
  args: {
    builds: mockBuilds,
    selectedBuild: mockBuilds[1],
  },
};

export const WithFailedBuild: Story = {
  render: (args) => <BuildSelectorTemplate {...args} />,
  args: {
    builds: mockBuilds,
    selectedBuild: mockBuilds[2],
  },
};

export const SingleBuild: Story = {
  render: (args) => <BuildSelectorTemplate {...args} />,
  args: {
    builds: [mockBuilds[0]],
    selectedBuild: mockBuilds[0],
  },
};

export const EmptyBuilds: Story = {
  render: (args) => <BuildSelectorTemplate {...args} />,
  args: {
    builds: [],
    selectedBuild: mockBuilds[0],
  },
};

export const InitiallyOpen: Story = {
  render: ({ builds, selectedBuild: initialSelectedBuild, ...args }) => {
    const [open, setOpen] = useState(true); // Start with panel open
    const [selectedBuild, setSelectedBuild] = useState(initialSelectedBuild);

    return (
      <div>
        <p style={{ margin: '16px 0', fontFamily: 'system-ui' }}>
          <strong>Current External State:</strong> {selectedBuild.name} (UUID:{' '}
          {selectedBuild.uuid})
        </p>
        <BuildSelector
          {...args}
          builds={builds}
          selectedBuild={selectedBuild}
          open={open}
          onOpen={() => setOpen(true)}
          onChange={(build) => {
            setSelectedBuild(build);
          }}
          onCancel={() => setOpen(false)}
          onSave={() => {
            setOpen(false);
          }}
        />
      </div>
    );
  },
  args: {
    builds: mockBuilds,
    selectedBuild: mockBuilds[0],
  },
};
