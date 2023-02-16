import { readdirSync } from "fs";
import { join } from "path";
import { slug } from "github-slugger";

export const PostDir = join(process.cwd(), "_posts");
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
