export const DEFAULT_DB_CONNECTION = Symbol.for('DEFAULT_DB_CONNECTION');
export const JWT_ACCESS_TOKEN_STRATEGY = 'JWT_ACCESS_TOKEN_STRATEGY';
export const JWT_REFRESH_TOKEN_STRATEGY = 'JWT_REFRESH_TOKEN_STRATEGY';

export const CONTRACT_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  EXPIRED: 'expired',
  TERMINATED: 'terminated',
} as const;

export type ContractStatus =
  (typeof CONTRACT_STATUS)[keyof typeof CONTRACT_STATUS];
