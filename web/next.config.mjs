/** @type {import('next').NextConfig} */
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: repo ? `/${repo}` : "",
  assetPrefix: repo ? `/${repo}/` : ""
};

export default nextConfig;


