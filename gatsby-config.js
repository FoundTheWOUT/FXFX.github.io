module.exports = {
  // pathPrefix: "/blog",
  siteMetadata: {
    title: "waua-blog-gatsby",
  },
  plugins: [
    "gatsby-plugin-pnpm",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/_posts/`,
      },
      __key: "pages",
    },
    // {
    //   resolve: "gatsby-plugin-page-creator",
    //   options: {
    //     path: `${__dirname}/_posts`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        defaultLayouts: {
          default: require.resolve(`./src/templates/MdxDefault.tsx`),
        },
        gatsbyRemarkPlugins: [{ resolve: "gatsby-remark-header" }],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve("./src/layouts/Common.tsx"),
      },
    },
  ],
};
