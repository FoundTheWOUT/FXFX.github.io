module.exports = {
  pathPrefix: "/blog",
  siteMetadata: {
    title: "waua-blog-gatsby",
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          // {
          //   resolve: "./plugins/gatsby-remark-autolink-headers-local",
          //   options: {
          //     offsetY: "100",
          //   },
          // },
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              offsetY: "100",
              elements: [`h1`, `h2`],
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./_posts/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve("./src/layouts/Common.tsx"),
      },
    },
  ],
};
