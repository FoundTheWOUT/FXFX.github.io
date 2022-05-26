const toString = require(`mdast-util-to-string`);
const visit = require(`unist-util-visit`);
const slugs = require(`github-slugger`)();

function patch(context, key, value) {
  if (!context[key]) {
    context[key] = value;
  }

  return context[key];
}

module.exports = ({ markdownAST }) => {
  slugs.reset();
  visit(markdownAST, `heading`, (node) => {
    const id = slugs.slug(toString(node));
    const data = patch(node, `data`, {});
    patch(data, `id`, id);
    patch(data, `htmlAttributes`, {});
    patch(data, `hProperties`, {});
    patch(data.htmlAttributes, `id`, id);
    patch(data.hProperties, `id`, id);
  });

  return markdownAST;
};
