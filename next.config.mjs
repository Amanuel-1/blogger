// @ts-check

import fs from "fs";
import path from "path";
import { withContentlayer } from "next-contentlayer";

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ["i.scdn.co"],
    formats: ["image/avif", "image/webp"],
  },
  eslint: {
    dirs: ["components", "lib", "pages", "hooks"],
  },
  experimental: {
    legacyBrowsers: false,
    runtime: "experimental-edge",
    images: {
      allowFutureImage: true,
    },
  },
  rewrites: async () => {
    return [
      {
        source: "/bee.js",
        destination: "https://cdn.splitbee.io/sb.js",
      },
      {
        source: "/_hive/:slug",
        destination: "https://hive.splitbee.io/:slug",
      },
    ];
  },
  redirects: async () => {
    const redirects = [];

    // Move all blog posts under /blog
    const postsDirectory = path.join("content", "posts");
    const fileNames = fs.readdirSync(postsDirectory);
    const routes = fileNames.map((fileName) => fileName.replace(/\.mdx$/, ""));

    for (const route of routes) {
      redirects.push({
        source: `/${route}`,
        destination: `/blog/${route}`,
        permanent: true,
      });
    }

    // Fix redirect for DEV post for https://dev.to/akhilaariyachandra/mimic-react-life-cycle-methods-with-hooks-286a
    redirects.push({
      source: `/mimic-react-life-cycles-methods-with-hooks`,
      destination: `/blog/mimic-react-life-cycle-methods-with-hooks`,
      permanent: true,
    });

    // Rename react-usereducer-with-context to react-usereducer-with-usecontext
    redirects.push({
      source: `/blog/react-usereducer-with-context`,
      destination: `/blog/react-usereducer-with-usecontext`,
      permanent: true,
    });

    // Move information in /about to /
    redirects.push({
      source: `/about`,
      destination: `/`,
      permanent: true,
    });

    return redirects;
  },
};

export default withContentlayer(nextConfig);
