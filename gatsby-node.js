const path = require("path");
const { compileMDXWithCustomOptions } = require(`gatsby-plugin-mdx`);
const { remarkHeadingsPlugin } = require(`./plugins/remark-headings-plugin`);
const GithubSlug = require("github-slugger");
const slugger = new GithubSlug();

const postTemplate = path.resolve(`./src/components/MDX/MDXLayout.tsx`);
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMdx {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
        totalCount
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // create post-list pages
  const totalPost = result.data.allMdx.totalCount;
  const pagination = 10;
  const postListPages = Math.ceil(totalPost / pagination);
  for (let i = 0; i < postListPages; i++) {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve("./src/components/PostList.tsx"),
      context: {
        limit: pagination,
        skip: i * pagination,
        postListPages,
        currentPage: i + 1,
      },
    });
  }

  // create post pages
  const posts = result.data.allMdx.nodes;
  posts.forEach((postNode) => {
    createPage({
      path: postNode.fields.slug,
      component: `${postTemplate}?__contentFilePath=${postNode.internal.contentFilePath}`,
      context: {
        id: postNode.id,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    createNodeField({
      node,
      name: "slug",
      value: slugger.slug(node.frontmatter.title),
    });
  }
};

exports.createSchemaCustomization = async ({
  getNode,
  getNodesByType,
  pathPrefix,
  reporter,
  cache,
  actions,
  schema,
  store,
}) => {
  const { createTypes } = actions;

  const headingsResolver = schema.buildObjectType({
    name: `Mdx`,
    fields: {
      headings: {
        type: `[MdxHeading]`,
        async resolve(mdxNode) {
          const fileNode = getNode(mdxNode.parent);

          if (!fileNode) {
            return null;
          }

          const result = await compileMDXWithCustomOptions(
            {
              source: mdxNode.body,
              absolutePath: fileNode.absolutePath,
            },
            {
              pluginOptions: {},
              customOptions: {
                mdxOptions: {
                  remarkPlugins: [remarkHeadingsPlugin],
                },
              },
              getNode,
              getNodesByType,
              pathPrefix,
              reporter,
              cache,
              store,
            }
          );

          if (!result) {
            return null;
          }

          return result.metadata.headings;
        },
      },
    },
  });

  createTypes([
    `
      type MdxHeading {
        value: String
        depth: Int
      }
    `,
    headingsResolver,
  ]);
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
