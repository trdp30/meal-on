import { canLogin } from '../canLogin';

describe('canLogin', () => {
  it('should return false if isAnonymous', () => {
    expect(canLogin({ roles: [], isAnonymous: true })).toBeFalsy();
  });

  it('should return true if default route', () => {
    expect(canLogin({ roles: ['Content Manager'], path: '/logout', isAnonymous: false })).toBeTruthy();
  });
  it('should return true if default route and no role set', () => {
    expect(canLogin({ roles: [], path: '/dashboard', isAnonymous: false })).toBeTruthy();
  });

  it('should return false if restricted route', () => {
    expect(canLogin({ roles: ['Content Manager'], path: '/admin', isAnonymous: false })).toBeFalsy();
  });
});
