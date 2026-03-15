/** @type {import('next').NextConfig} */
const [owner = "", repo = ""] = (process.env.GITHUB_REPOSITORY ?? "/").split("/");
const isUserPagesRepo = repo === `${owner}.github.io`;
const pathPrefix = repo && !isUserPagesRepo ? `/${repo}` : "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: pathPrefix,
  assetPrefix: pathPrefix ? `${pathPrefix}/` : ""
};

export default nextConfig;


