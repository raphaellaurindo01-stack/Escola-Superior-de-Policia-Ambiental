export const ENROLLMENT_STATUS = Object.freeze({
  RECEIVED: 'received',
  UNDER_REVIEW: 'under-review',
  APPROVED: 'approved',
  NOT_APPROVED: 'not-approved',
  CANCELLED: 'cancelled'
});

export function normalizeCourse(input = {}) {
  return {
    id: String(input.id || ''),
    year: Number(input.year || new Date().getFullYear()),
    title: String(input.title || '').trim(),
    audience: String(input.audience || '').trim(),
    startDate: input.startDate || '',
    endDate: input.endDate || '',
    enrollmentOpen: input.enrollmentOpen === true,
    seats: Number.isFinite(Number(input.seats)) ? Number(input.seats) : null,
    enrollmentUrl: String(input.enrollmentUrl || ''),
    status: String(input.status || 'draft'),
    updatedAt: input.updatedAt || new Date().toISOString()
  };
}

export function enrollmentMessage(status) {
  const messages = {
    [ENROLLMENT_STATUS.RECEIVED]: 'Inscrição recebida — aguardando análise.',
    [ENROLLMENT_STATUS.UNDER_REVIEW]: 'Inscrição em análise.',
    [ENROLLMENT_STATUS.APPROVED]: 'Inscrição aprovada.',
    [ENROLLMENT_STATUS.NOT_APPROVED]: 'Inscrição não aprovada.',
    [ENROLLMENT_STATUS.CANCELLED]: 'Inscrição cancelada.'
  };
  return messages[status] || 'Situação da inscrição indisponível.';
}
