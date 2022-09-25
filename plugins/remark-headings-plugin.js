const visit = require(`unist-util-visit`);
const toString = require(`mdast-util-to-string`);
const GithubSlug = require("github-slugger");
const slugger = new GithubSlug();

exports.remarkHeadingsPlugin = function remarkHeadingsPlugin() {
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
};
