import { ROLE_MASTER_RECRUITER, ROLE_RECRUITER } from 'utils/data/roles';

export const DEFAULT_ROUTE_PERMISSIONS = ['/login', '/logout', '/dashboard'];
export const ROUTE_PERMISSIONS = {
  [ROLE_MASTER_RECRUITER]: [
    '/dashboard',
    '/workflow',
    '/workflow/:workflow_id',
    '/workflow/:workflow_id/invite/:step_id',
    '/workflow/:workflow_id/drive/:drive_id',
  ],
  [ROLE_RECRUITER]: [
    '/dashboard',
    '/workflow',
    '/workflow/:workflow_id',
    '/workflow/:workflow_id/invite/:step_id',
    '/workflow/:workflow_id/drive/:drive_id',
  ],
  // [ROLE_ADMIN]: ['/question-bank', '/taxonomy', '/library', '/admin'],
  // [ROLE_CONTENT_MANAGER]: ['/question-bank', '/taxonomy', '/library'],
};
