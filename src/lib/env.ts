export const env = {
  // Public environment variables
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://justevery.com',
  r2PublicUrl: process.env.NEXT_PUBLIC_R2_PUBLIC_URL,
  gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Runtime checks
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
} as const;

// Type-safe environment variable access
export function getEnvVar<K extends keyof typeof env>(key: K): (typeof env)[K] {
  return env[key];
}
