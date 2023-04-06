import { allPosts, allSnippets } from "@/.contentlayer/generated";

const sitemap = () => {
  const posts = allPosts.map((post) => ({
    url: `https://akhilaariyachandra.com/blog/${post.slug}`,
    lastModified: post.updated
      ? post.updated.split("T")[0]
      : post.posted.split("T")[0],
  }));

  const snippets = allSnippets.map((snippet) => ({
    url: `https://akhilaariyachandra.com/snippets/${snippet.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const routes = ["", "/blog", "/snippets", "/dashboard"].map((route) => ({
    url: `https://akhilaariyachandra.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...posts, ...snippets];
};

export default sitemap;
