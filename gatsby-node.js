const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            id
            fields {
              path
            }
            frontmatter {
              title
            }
            headings {
              depth
              value
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // create post-list pages
  const posts = result.data.allMdx.edges;
  const postsPerPage = 10;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve("./src/templates/PostList.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  // create post pages
  posts.forEach(({ node }) => {
    const fieldsPath = node.fields.path;
    createPage({
      path: fieldsPath,
      component: path.join(
        __dirname,
        `./_posts${fieldsPath.slice(0, fieldsPath.length - 1)}.md`
      ),
      context: {
        id: node.id,
        headings: node.headings,
      },
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const generatedPath = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: "path",
      value: generatedPath,
    });
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  });
};
