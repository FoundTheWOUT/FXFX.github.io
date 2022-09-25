import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import GithubSlug from "github-slugger";
const slugger = new GithubSlug();

export default function remarkHeadingsPlugin() {
  return async function transformer(tree, file) {
    slugger.reset();
    let headings = [];

    visit(tree, `heading`, (heading) => {
      const value = toString(heading);
      headings.push({
        id: slugger.slug(value),
        value,
        depth: heading.depth,
      });
    });

    const mdxFile = file;
    if (!mdxFile.data.meta) {
      mdxFile.data.meta = {};
    }

    mdxFile.data.meta.headings = headings;
  };
}
