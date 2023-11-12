import { compact, flatMap, memoize } from 'lodash';
import { DEFAULT_ROUTE_PERMISSIONS, ROUTE_PERMISSIONS } from './permissions';

export const canLogin = ({ roles, path, isAnonymous }) => {
  const allowed = compact(
    flatMap(ROUTE_PERMISSIONS, (routes, role) => (roles && roles.includes(role) ? routes : null)).concat(
      DEFAULT_ROUTE_PERMISSIONS,
    ),
  );

  return !isAnonymous && allowed.includes(path);
};

export default memoize(canLogin);
