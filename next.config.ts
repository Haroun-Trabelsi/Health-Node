import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const config: NextConfig = {
  output: 'standalone',
  experimental: {
    typedRoutes: true
  }
};

export default withSentryConfig(
  config,
  {
    silent: true
  },
  {
    hideSourceMaps: true
  }
);
