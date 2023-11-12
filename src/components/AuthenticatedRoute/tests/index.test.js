/**
 *
 * Tests for AuthenticatedRoute
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'utils/testHelpers';
import '@testing-library/jest-dom'; // add some helpful assertions

import { Route, Routes } from 'react-router-dom';
import AuthenticatedRoute from '../index';

describe('<AuthenticatedRoute />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<AuthenticatedRoute />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Redirect to login on logged out', () => {
    const { getByText } = render(
      <Routes>
        <Route
          path="/dashboard"
          element={
            <AuthenticatedRoute path="/dashboard">
              <div>dashboard</div>
            </AuthenticatedRoute>
          }
        />
        <Route path="/login" element={<div>Login</div>} />
      </Routes>,
      {
        user: { isAnonymous: true },
        route: ['/dashboard'],
      },
    );
    expect(getByText('Login')).toBeTruthy();
  });

  it('Should render and match the snapshot', () => {
    const { container } = render(<AuthenticatedRoute />);
    expect(container).toMatchSnapshot();
  });
});
