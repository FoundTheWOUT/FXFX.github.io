const wrapESMPlugin = (name) =>
  function wrapESM(opts) {
    return async (...args) => {
      const mod = await import(name);
      const plugin = mod.default(opts);
      return plugin(...args);
    };
  };

module.exports = {
  // pathPrefix: "/blog",
  siteMetadata: {
    title: "waua-blog-gatsby",
  },
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        mdxOptions: {
          remarkPlugins: [require("remark-gfm")],
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/_posts/`,
      },
    },
  ],
};
