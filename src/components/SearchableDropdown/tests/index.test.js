/**
 *
 * Tests for SearchableDropdown
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import fetchData from 'utils/fetchData';
import userEvent from '@testing-library/user-event';
import { render, waitFor } from 'utils/testHelpers';
import '@testing-library/jest-dom';
import Auth from 'utils/auth';
import { defaultProps, items } from './mocks';
import SearchableDropdown from '../index';

jest.mock('utils/auth');
// beforeEach(() => {
//   jest.useFakeTimers();
// });

// beforeEach(() => {
//   jest.runAllTimers();
// });

Auth.client.mockImplementation(() => ({ query: jest.fn().mockResolvedValue({ data: items }) }));

global.fetch = jest.fn(() => Promise.resolve());

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  debounce: fn => {
    // eslint-disable-next-line no-param-reassign
    fn.cancel = jest.fn();
    return fn;
  },
}));

jest.mock('utils/fetchData');
fetchData.mockImplementation(() => [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
]);

describe('<SearchableDropdown />', () => {
  it('Expect to not log errors in console', async () => {
    const spy = jest.spyOn(global.console, 'error');
    const onChange = jest.fn();
    const searchFn = jest.fn().mockReturnValue([]);
    const selectedItems = [];
    const { getByRole } = render(
      <SearchableDropdown {...defaultProps} setSelected={onChange} selectedItems={selectedItems} search={searchFn} />,
    );
    await waitFor(() => getByRole('combobox'));
    expect(spy).not.toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  });

  it('Should render and match the snapshot', async () => {
    const onChange = jest.fn();
    const searchFn = jest.fn().mockReturnValue([]);
    const selectedItems = [];
    const { container, getByRole } = render(
      <SearchableDropdown {...defaultProps} setSelected={onChange} selectedItems={selectedItems} search={searchFn} />,
    );
    await waitFor(() => getByRole('combobox'));
    expect(container).toMatchSnapshot();
  });
  const props = {
    placeholder: 'Select an option',
    labelKey: 'name',
    primaryKey: 'id',
    selectedItems: [],
    setSelected: jest.fn(),
    emptyLabel: 'No options found',
    query: {
      queryString: '/api/options',
      queryKey: 'search',
      queryVariables: {},
    },
  };

  it('renders correctly', () => {
    const { getByText } = render(<SearchableDropdown {...props} />);
    const dropdown = getByText('Select an option');
    expect(dropdown).toBeInTheDocument();
  });

  it('fetch Data is called upon loading the component', async () => {
    render(<SearchableDropdown {...props} />);
    await waitFor(() => expect(fetchData).toBeCalled());
  });

  it('options loaded on typing ', async () => {
    const { container, getByText } = render(<SearchableDropdown {...props} />);
    await waitFor(() => expect(fetchData).toBeCalled());
    const user = userEvent.setup();
    const dropdown = getByText('Select an option');
    await user.type(dropdown, 'Option 1');
    expect(container).toMatchSnapshot();
  });

  // it('options loaded on typing ', async () => {
  //   jest.useFakeTimers();
  //   const { getByText, getByRole } = render(<SearchableDropdown {...props} />);
  //   jest.runAllTimers();
  //   const user = userEvent.setup();
  //   const dropdown = getByText('Select an option');
  //   await user.click(dropdown);
  //   jest.runAllTimers();
  //   const dropdownInput = getByRole('textbox');
  //   console.log('dropdownInput', dropdownInput);
  //   await user.type(dropdownInput, '1');
  //   jest.runAllTimers();

  //   screen.debug();
  //   await user.click(getByText('Option 1'));
  // });

  // it('should render the options on the on clicking the combobox button', async () => {
  //   const user = userEvent.setup();
  //   const onChange = jest.fn();
  //   const searchFn = jest.fn().mockReturnValue(items);

  //   const selectedItems = [];
  //   const { container, getByRole, getAllByRole } = render(
  //     <SearchableDropdown {...defaultProps} onChange={onChange} selectedItems={selectedItems} search={searchFn} />,
  //   );
  //   await waitFor(() => getByRole('button'));
  //   await user.click(getByRole('button'));
  //   expect(searchFn).toHaveBeenCalled();

  //   await waitFor(() => getAllByRole('option'));
  //   expect(getAllByRole('option')).toHaveLength(items.length);
  //   expect(container).toMatchSnapshot();
  // });

  // it('should have empty options while search function is not provided as prop', async () => {
  //   const user = userEvent.setup();
  //   const onChange = jest.fn();
  //   const spy = jest.spyOn(global.console, 'error');

  //   const selectedItems = [];
  //   const { container, getByRole, getByText } = render(
  //     <SearchableDropdown {...defaultProps} onChange={onChange} selectedItems={selectedItems} />,
  //   );
  //   await user.click(getByRole('button'));

  //   await waitFor(() => getByRole('option'));
  //   expect(getByText('No results')).toBeTruthy();
  //   expect(container).toMatchSnapshot();
  //   expect(spy).toHaveBeenCalled();
  //   spy.mockReset();
  //   spy.mockRestore();
  // });

  // it('should have empty options while queryString is not provided as prop', async () => {
  //   const user = userEvent.setup();
  //   const onChange = jest.fn();
  //   const searchFn = jest.fn().mockReturnValue(items);

  //   const spy = jest.spyOn(global.console, 'error');

  //   const selectedItems = [];
  //   const { ...props } = defaultProps;
  //   const { getByRole, getByText } = render(
  //     <SearchableDropdown {...props} onChange={onChange} selectedItems={selectedItems} search={searchFn} />,
  //   );
  //   await user.click(getByRole('button'));

  //   await waitFor(() => getByRole('option'));
  //   expect(getByText('No results')).toBeTruthy();
  //   expect(spy).toHaveBeenCalled();
  //   spy.mockReset();
  //   spy.mockRestore();
  // });

  // it('should have empty options while queryKey is not provided as prop', async () => {
  //   const user = userEvent.setup();
  //   const onChange = jest.fn();
  //   const searchFn = jest.fn().mockReturnValue(items);
  //   const spy = jest.spyOn(global.console, 'error');

  //   const selectedItems = [];
  //   const { queryKey, ...props } = defaultProps;
  //   const { getByRole, getByText } = render(
  //     <SearchableDropdown {...props} onChange={onChange} selectedItems={selectedItems} search={searchFn} />,
  //   );
  //   await user.click(getByRole('button'));

  //   await waitFor(() => getByRole('option'));
  //   expect(getByText('No results')).toBeTruthy();
  //   expect(spy).toHaveBeenCalled();
  //   spy.mockReset();
  //   spy.mockRestore();
  // });

  // it('should call the search function when data entered in the search box', async () => {
  //   const user = userEvent.setup();
  //   const onChange = jest.fn();
  //   const searchFn = jest.fn().mockReturnValue(items);
  //   const spy = jest.spyOn(global.console, 'error');

  //   const selectedItems = [];
  //   const { getByRole } = render(
  //     <SearchableDropdown {...defaultProps} onChange={onChange} selectedItems={selectedItems} search={searchFn} />,
  //   );
  //   await user.click(getByRole('button'));
  //   await user.type(getByRole('combobox'), 'a');
  //   expect(searchFn).toBeCalledTimes(2);
  //   expect(spy).not.toHaveBeenCalled();
  //   spy.mockReset();
  //   spy.mockRestore();
  // });

  // it('should have empty while providing invalid queryString', async () => {
  //   const user = userEvent.setup();
  //   const onChange = jest.fn();
  //   const searchFn = jest.fn().mockReturnValue(items);

  //   const selectedItems = [];
  //   const { getByText, getByRole } = render(
  //     <SearchableDropdown
  //       {...defaultProps}
  //       queryString="hello world"
  //       onChange={onChange}
  //       selectedItems={selectedItems}
  //       search={searchFn}
  //     />,
  //   );
  //   await user.click(getByRole('button'));
  //   await waitFor(() => getByRole('option'));
  //   expect(getByText('No results')).toBeTruthy();
  // });
});
