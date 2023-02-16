import PostList from "@/components/PostList";
import { getAllPosts, PostDir, serializeFrontmatter } from "@/utils/posts";
import { createReadStream } from "fs";
import { join } from "path";
import readline from "readline";
import yaml from "js-yaml";
import dayjs from "dayjs";

function Index({ posts, pageSlug, totalPages }) {
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
    />
  );
}

const pagination = 10;

export async function getStaticProps() {
  const posts = getAllPosts();
  // const i = slug === null ? 0 : parseInt(slug[0]);

  return {
    props: {
      // pageSlug: slug,
      totalPages: Math.ceil(posts.length / pagination),
      posts: (
        await Promise.all(
          posts.map(async ({ slug, filePath }) => {
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
            let originData = 0;
            let hide = false;
            try {
              frontmatterObj = yaml.load(frontmatter);
              originData = Number(frontmatterObj.date);
              frontmatterObj = serializeFrontmatter(frontmatterObj);

              typeof frontmatterObj.hide === "boolean" &&
                (hide = frontmatterObj.hide);
            } catch (error) {
              console.log(error);
            }
            return {
              slug,
              hide,
              date: originData,
              frontmatter: JSON.stringify(frontmatterObj),
              excerpt,
            };
          })
        )
      )
        .filter(({ hide }) => !hide)
        .sort((a, b) => {
          return b.date - a.date;
        }),
    },
  };
}

export default Index;
