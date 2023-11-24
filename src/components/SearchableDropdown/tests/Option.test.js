import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Option from '../Option';

describe('Option', () => {
  const props = {
    selectProps: {
      OptionComponent: null,
      primaryKey: 'id',
      labelKey: 'name',
    },
    getStyles: jest.fn(),
    getClassNames: jest.fn(),
    cx: jest.fn(),
    data: {
      id: 1,
      name: 'Option 1',
      email: 'option1@example.com',
    },
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Option {...props}>Child Content</Option>);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<Option {...props}>Child Content</Option>);
    expect(container).toMatchSnapshot();
  });
  it('renders correctly', () => {
    const { getByText } = render(<Option {...props}>Child Content</Option>);

    // Assert that the default content is rendered
    expect(getByText('Child Content')).toBeInTheDocument();
  });
});
