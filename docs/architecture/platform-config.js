// ESPA Platform v3 — configuração pública e portátil.
// Nunca inserir segredos, tokens, CPF ou credenciais neste arquivo.
export const ESPA_PLATFORM = Object.freeze({
  version: '3.0.0-dev',
  access: {
    defaultPolicy: 'deny',
    publicAreas: ['courses'],
    restrictedAreas: ['library', 'environmental-ai', 'occurrence-assistant', 'my-material', 'inspection-mode'],
    roles: ['policial', 'gerente', 'admin']
  },
  auth: {
    enabled: false,
    adapter: 'pending',
    providerHint: 'oidc',
    authorizationMode: 'manual-approval'
  },
  data: {
    adapter: 'pending',
    productionPersonalDataAllowed: false,
    occurrenceRetention: 'transient-by-default'
  },
  ai: {
    enabled: false,
    endpoint: '',
    providers: ['cloudflare-workers-ai', 'gemini', 'groq'],
    paidFallbackAllowed: false,
    localFallback: true
  },
  courses: {
    enabled: true,
    enrollmentAdapter: 'google-forms',
    externalEnrollmentDisclosure: true,
    approvalIsManual: true
  }
});
