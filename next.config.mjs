/** @type {import('next').NextConfig} */
// Em teste (GitHub Pages) use NEXT_PUBLIC_BASE_PATH=/site-eletrix. Em eletrix.mobi deixe vazio.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const nextConfig = {
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: false },
};

export default nextConfig;
