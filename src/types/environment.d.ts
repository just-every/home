declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_R2_PUBLIC_URL?: string;
      NEXT_PUBLIC_SITE_URL?: string;
      NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
      NEXT_PUBLIC_SENTRY_DSN?: string;
    }
  }
}

export {};
