import PostList from "@/components/PostList";
import { getAllPosts } from "@/utils/posts";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { createReadStream, readFileSync } from "fs";
import { join } from "path";
import { PostDir } from "@/shared";
import { remark } from "remark";
import readline from "readline";
import yaml from "js-yaml";
import dayjs from "dayjs";

function Index({ posts, pageSlug, totalPages }) {
  const currentPage = pageSlug ? parseInt(pageSlug[0]) + 1 : 1;
  return (
    <PostList
      data={{
        allMdx: {
          nodes: posts.map(({ frontmatter, excerpt, ...post }) => ({
            fields: { slug: post.slug },
            frontmatter: JSON.parse(frontmatter),
            excerpt,
          })),
        },
      }}
      pageContext={{
        currentPage,
        postListPages: totalPages,
      }}
    />
  );
}

const pagination = 10;
export async function getStaticPaths() {
  const posts = getAllPosts();
  const paths = new Array(Math.ceil(posts.length / pagination));
  // frontmatter
  for (let i = 0; i < paths.length; i++) {
    paths[i] = {
      params: {
        slug: i === 0 ? [] : [i.toString()],
      },
    };
  }
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug = null } }) {
  const posts = getAllPosts();
  const i = slug === null ? 0 : parseInt(slug[0]);

  return {
    props: {
      pageSlug: slug,
      totalPages: Math.ceil(posts.length / pagination),
      posts: await Promise.all(
        posts
          .slice(i * pagination, (i + 1) * pagination)
          .map(async ({ slug, filePath }) => {
            const stream = createReadStream(join(PostDir, filePath), "utf-8");
            let readingFrontmatter = false;
            let frontmatter = "";
            let excerpt = "";
            const rl = readline.createInterface({
              input: stream,
              crlfDelay: Infinity,
            });
            for await (const line of rl) {
              if (excerpt.length >= 50) {
                break;
              } else if (line === "---") {
                readingFrontmatter = !readingFrontmatter;
              } else if (readingFrontmatter) {
                frontmatter += line + "\n";
              } else {
                excerpt += line;
              }
            }
            if (excerpt.length >= 50) {
              excerpt = excerpt.slice(0, 70);
              excerpt += "...";
            }
            rl.close();
            stream.close();
            let frontmatterObj = {} as any;
            try {
              frontmatterObj = yaml.load(frontmatter);
              frontmatterObj?.date &&
                Reflect.set(
                  frontmatterObj,
                  "date",
                  dayjs(frontmatterObj.date).format("YYYY-MM-DD")
                );
              frontmatterObj?.updated &&
                Reflect.set(
                  frontmatterObj,
                  "updated",
                  dayjs(frontmatterObj.updated).format("YYYY-MM-DD")
                );
            } catch (error) {
              console.log(error);
            }
            return {
              slug,
              frontmatter: JSON.stringify(frontmatterObj),
              excerpt,
            };
          })
      ),
    },
  };
}

export default Index;
