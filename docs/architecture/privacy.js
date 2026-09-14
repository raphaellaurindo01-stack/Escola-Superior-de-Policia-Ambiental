// Regras client-side são defesa adicional; a autorização definitiva deverá ocorrer no backend.
export const DATA_CLASSES = Object.freeze({
  PUBLIC: 'public',
  INTERNAL: 'internal',
  PERSONAL: 'personal',
  SENSITIVE_OR_OPERATIONAL: 'sensitive-or-operational'
});

const FORBIDDEN_AI_FIELDS = /\b(cpf|senha|password|token|recovery\s*key|chave\s*de\s*recupera[cç][aã]o)\b/i;

export function validateAiSubmission(text) {
  const value = String(text || '').trim();
  if (!value) return { ok: false, reason: 'Consulta vazia.' };
  if (value.length > 12000) return { ok: false, reason: 'Consulta excede o limite permitido.' };
  if (FORBIDDEN_AI_FIELDS.test(value)) return { ok: false, reason: 'Remova credenciais, CPF ou outros identificadores desnecessários antes de enviar à IA.' };
  return { ok: true };
}

export function minimalAuditEvent({ action, actorSubject, targetType, targetId }) {
  return {
    at: new Date().toISOString(),
    action: String(action || ''),
    actorSubject: String(actorSubject || ''),
    targetType: String(targetType || ''),
    targetId: String(targetId || '')
  };
}

export const PRIVACY_DEFAULTS = Object.freeze({
  collectOnlyNecessary: true,
  storeOccurrenceByDefault: false,
  storeSecretsInFrontend: false,
  productionPersonalDataInRepository: false,
  requirePurposeForNewFields: true,
  requireRetentionRuleForNewFields: true
});
