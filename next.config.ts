import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const config: NextConfig = {
  output: 'standalone',
  typedRoutes: true
};

export default withSentryConfig(
  config,
  {
    silent: true
  },

);
