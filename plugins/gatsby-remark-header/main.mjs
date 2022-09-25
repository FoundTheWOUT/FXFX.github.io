import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";
import GithubSlug from "github-slugger";
const slugger = new GithubSlug();

function patch(context, key, value) {
  if (!context[key]) {
    context[key] = value;
  }
  return context[key];
}
// this plugins modify the mast which generating form remark tool chain.
// inject the html node, for example, the 'id' attribute, which providing linking.
export default ({ markdownAST }) => {
  slugger.reset();
  visit(markdownAST, `heading`, (node) => {
    const id = slugger.slug(toString(node));
    const data = patch(node, `data`, {});
    patch(data, `id`, id);
    patch(data, `htmlAttributes`, {});
    patch(data, `hProperties`, {});
    patch(data.htmlAttributes, `id`, id);
    patch(data.hProperties, `id`, id);
  });

  return markdownAST;
};
