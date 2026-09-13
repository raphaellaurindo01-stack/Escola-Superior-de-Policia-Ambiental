import { ESPA_PLATFORM } from './platform-config.js';

const ROLE_PERMISSIONS = Object.freeze({
  policial: new Set(['library','environmental-ai','occurrence-assistant','my-material','inspection-mode','courses']),
  gerente: new Set(['library','environmental-ai','occurrence-assistant','my-material','inspection-mode','courses','courses-manage','enrollments-review','library-curate']),
  admin: new Set(['library','environmental-ai','occurrence-assistant','my-material','inspection-mode','courses','courses-manage','enrollments-review','library-curate','users-manage','audit-read'])
});

export function normalizeIdentity(identity) {
  if (!identity || typeof identity !== 'object') return null;
  const role = ESPA_PLATFORM.access.roles.includes(identity.role) ? identity.role : null;
  return {
    subject: typeof identity.subject === 'string' ? identity.subject : '',
    role,
    approved: identity.approved === true,
    suspended: identity.suspended === true
  };
}

export function canAccess(identity, resource) {
  if (ESPA_PLATFORM.access.publicAreas.includes(resource)) return true;
  const user = normalizeIdentity(identity);
  if (!user || !user.subject || !user.role || !user.approved || user.suspended) return false;
  return ROLE_PERMISSIONS[user.role]?.has(resource) === true;
}

export function requireAccess(identity, resource) {
  if (!canAccess(identity, resource)) throw new Error('Acesso não autorizado');
  return true;
}
