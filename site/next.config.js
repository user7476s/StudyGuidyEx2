/** @type {import('next').NextConfig} */

// === EDIT ME: set REPO_NAME to your GitHub repo name (e.g., 'phy2049-study'). ===
// === This is the ONLY line you need to change before pushing to GitHub Pages. ===
const REPO_NAME = 'StudyGuidyEx2';

const isProd = process.env.NODE_ENV === 'production';
const prefix = REPO_NAME && REPO_NAME !== 'REPO_NAME' ? `/${REPO_NAME}` : '';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isProd ? prefix : '',
  assetPrefix: isProd ? `${prefix}/` : '',
  reactStrictMode: true,
};

module.exports = nextConfig;
