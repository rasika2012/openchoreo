/**
 * Generates the component's TypeScript content
 * @param {string} elementName - Name of the element
 * @returns {string} Component content
 */
function generateComponentContent(elementName) {
    return `import React from 'react';
import { Styled${elementName} } from './${elementName}.styled';

export interface ${elementName}Props {
  /** The content to be rendered within the component */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Whether the component is disabled */
  disabled?: boolean;
}

/**
 * ${elementName} component
 * @component
 */
export const ${elementName} = React.forwardRef<HTMLDivElement, ${elementName}Props>(
  ({ children, className, onClick, disabled = false, ...props }, ref) => {
    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (!disabled && onClick) {
          onClick(event);
        }
      },
      [disabled, onClick]
    );

    return (
      <Styled${elementName}
        ref={ref}
        className={className}
        onClick={handleClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </Styled${elementName}>
    );
  }
);

${elementName}.displayName = '${elementName}';
`;
}

/**
 * Generates the styled component content
 * @param {string} elementName - Name of the element
 * @returns {string} Styled component content
 */
function generateStyledContent(elementName) {
    return `import { Box, BoxProps, styled } from "@mui/material";
import { ComponentType } from "react";


export interface Styled${elementName}Props {
  disabled?: boolean;
}

export const Styled${elementName}: ComponentType<Styled${elementName}Props & BoxProps> = styled(Box)<BoxProps & Styled${elementName}Props>(({ disabled, theme }) => ({
  opacity: disabled ? 0.5 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

`;
}

/**
 * Generates the stories content
 * @param {string} elementName - Name of the element
 * @returns {string} Stories content
 */
function generateStoriesContent(elementName) {
    return `import type { Meta, StoryObj } from '@storybook/react';
import { ${elementName} } from './${elementName}';

const meta: Meta<typeof ${elementName}> = {
  title: 'Choreo DS/${elementName}',
  component: ${elementName},
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
type Story = StoryObj<typeof ${elementName}>;

export const Default: Story = {
  args: {
    children: '${elementName} Content',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled ${elementName}',
    disabled: true,
  },
};
`;
}

/**
 * Generates the test content
 * @param {string} elementName - Name of the element
 * @returns {string} Test content
 */
function generateTestContent(elementName) {
    return `import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ${elementName} } from './${elementName}';

describe('${elementName}', () => {
    it('should render children correctly', () => {
        render(<${elementName}>Test Content</${elementName}>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <${elementName} className="custom-class">Content</${elementName}>
        );
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle click events', () => {
        const handleClick = jest.fn();
        render(<${elementName} onClick={handleClick}>Clickable</${elementName}>);
        
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should respect disabled state', () => {
        const handleClick = jest.fn();
        render(
            <${elementName} disabled onClick={handleClick}>
                Disabled
            </${elementName}>
        );
        
        fireEvent.click(screen.getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});
`;
}

/**
 * Generates view component content
 * @param {string} elementName - Name of the element
 * @returns {string} View component content
 */
function generateViewContent(elementName) {
    return `import { Card, CardContent, CardHeading } from '@open-choreo/design-system';

export function ${elementName}() {
  return (
    <Card testId="${elementName.toLowerCase()}">
      <CardHeading title="${elementName} Card" testId="${elementName.toLowerCase()}" />
      <CardContent>${elementName} Card Content</CardContent>
    </Card>
  );
}
`;
}

/**
 * Generates view stories content
 * @param {string} elementName - Name of the element
 * @returns {string} View stories content
 */
function generateViewStoriesContent(elementName) {
    return `import type { Meta, StoryObj } from '@storybook/react';
import { ${elementName} } from './${elementName}';

const meta: Meta<typeof ${elementName}> = {
  title: 'Choreo Views/${elementName}',
  component: ${elementName},
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
type Story = StoryObj<typeof ${elementName}>;

export const Default: Story = {
  args: {
    children: '${elementName} Content',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled ${elementName}',
    disabled: true,
  },
};
`;
}

module.exports = {
    generateComponentContent,
    generateStyledContent,
    generateStoriesContent,
    generateTestContent,
    generateViewContent,
    generateViewStoriesContent
}; 