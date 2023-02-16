import { readdirSync } from "fs";
import { join } from "path";
import { slug } from "github-slugger";
import dayjs from "dayjs";

export const PostDir = join(process.cwd(), "_posts");

export const serializeFrontmatter = (frontmatter) => {
  return {
    ...frontmatter,
    date: frontmatter.date
      ? dayjs(frontmatter.date).format("YYYY-MM-DD")
      : null,
    update: frontmatter.update
      ? dayjs(frontmatter.update).format("YYYY-MM-DD")
      : null,
  };
};

export const getAllPosts = () => {
  const posts = readdirSync(join(process.cwd(), "_posts"));

  // todo: order by time
  return posts.map((post) => {
    const filename = post.replace(/\.mdx?$/, "");
    return {
      fullFilePath: join(process.cwd(), "_posts", post),
      filePath: post,
      slug: slug(filename),
    };
  });
};
