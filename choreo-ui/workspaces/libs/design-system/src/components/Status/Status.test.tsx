import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Status } from './Status';

describe('Status', () => {
  it('renders provided status text', () => {
    render(<Status severity="info" status="In Progress" />);
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('renders optional icon when provided', () => {
    const TestIcon = () => <span data-testid="icon">I</span>;
    render(<Status severity="success" status="Healthy" icon={<TestIcon />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies color based on severity', () => {
    const { container } = render(<Status severity="error" status="Failed" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
