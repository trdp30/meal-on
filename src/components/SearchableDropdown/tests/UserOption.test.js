import React from 'react';
import { render } from 'utils/testHelpers';
import '@testing-library/jest-dom';
import UserOptionComponent from '../UserOptionComponent';

describe('UserOptionComponent', () => {
  it('renders the component when option prop is provided', () => {
    const option = {
      user: {
        id: 1,
        email: 'test@example.com',
      },
    };

    const { container } = render(<UserOptionComponent option={option} />);

    // Assert that the component is rendered
    expect(container.firstChild).toBeInTheDocument();
  });

  it('does not render when option prop is not provided', () => {
    const { container } = render(<UserOptionComponent />);

    // Assert that the component is not rendered
    expect(container.firstChild).toBeNull();
  });

  it('renders with minimum required props', () => {
    const option = {
      user: {
        id: 1,
        email: 'test@example.com',
      },
    };

    const { container } = render(<UserOptionComponent option={option} />);

    // Assert that the component is rendered
    expect(container.firstChild).toBeInTheDocument();
  });
});
