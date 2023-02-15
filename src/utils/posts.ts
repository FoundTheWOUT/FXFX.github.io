import { readdirSync } from "fs";
import { join } from "path";
import { slug } from "github-slugger";

export const getAllPosts = () => {
  const posts = readdirSync(join(process.cwd(), "_posts"));

  // todo: order by time
  return posts.map((post) => {
    const filename = post.replace(/\.mdx?$/, "");
    return {
      filePath: post,
      slug: slug(filename),
    };
  });
};
