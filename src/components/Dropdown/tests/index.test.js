/**
 *
 * Tests for Dropdown
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'utils/testHelpers';
// import '@testing-library/jest-dom'; // add some helpful assertions

import Dropdown from '../index';

describe('<Dropdown />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const onChange = jest.fn();
    render(<Dropdown onChange={onChange} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it.skip('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(false);
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const onChange = jest.fn();
    const { container } = render(<Dropdown onChange={onChange} />);
    expect(container).toMatchSnapshot();
  });
});
