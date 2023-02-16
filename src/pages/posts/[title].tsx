import { getAllPosts, serializeFrontmatter } from "@/utils/posts";
import { GetStaticPaths } from "next/types";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { readFileSync } from "fs";
import MDXComponents from "@/components/MDX/MDXComponents";
import MDXLayout from "@/components/MDX/MDXLayout";
import remarkExportHeading from "plugins/remark-export-heading.mjs";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import { slug } from "github-slugger";
import Head from "next/head";
import remarkGfm from "remark-gfm";

function PostPage({ source, headings }) {
  return (
    <>
      <Head>
        <title>{source.frontmatter.title}</title>
      </Head>
      <MDXLayout
        data={{
          mdx: {
            frontmatter: source.frontmatter,
            headings,
          },
        }}
      >
        <MDXRemote {...source} components={MDXComponents} />
      </MDXLayout>
    </>
  );
}

// current Next is not supporting utf-8 path.
// we need to generate path with encodeURI.
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  return {
    paths: posts.map((post) => `/posts/${encodeURI(post.slug)}`),
    fallback: false,
  };
};

export async function getStaticProps({ params: { title = null } }) {
  const postList = getAllPosts();
  const post = postList.find((post) => post.slug === title);
  const file = readFileSync(post.fullFilePath, "utf-8");
  const headings = [] as { id: string; depth: number; title: string }[];
  const mdxSource = await serialize(file, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        [remarkExportHeading, { headings }],
        // patch id
        () => {
          return (ast) => {
            visit(ast, "heading", (node) => {
              const id = slug(toString(node));
              node.data = {
                id,
                htmlAttributes: {
                  id,
                },
                hProperties: {
                  id,
                },
              };
            });
          };
        },
      ],
    },
  });

  mdxSource?.frontmatter &&
    (mdxSource.frontmatter = serializeFrontmatter(mdxSource?.frontmatter));

  return {
    props: {
      headings: headings.map((h) => ({ ...h, value: h.title })),
      source: mdxSource,
    },
  };
}

export default PostPage;
