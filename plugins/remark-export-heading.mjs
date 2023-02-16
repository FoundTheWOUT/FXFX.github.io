import { visit } from "unist-util-visit";
import { slug } from "github-slugger";
import { toString } from "mdast-util-to-string";


/**
 * @typedef {import('mdast').Root} Root - https://github.com/syntax-tree/mdast#root
 * @typedef {import('mdast').Heading} Heading - https://github.com/syntax-tree/mdast#heading
 */

/**
 * @author https://github.com/expo/expo
 */

export default function plugin({ headings }) {
  /** @param {Root} tree */
  return (tree) => {
    /** @param {Heading} node -  */
    const visitor = (node) => {
      if (node.children.length > 0) {
        // parse text and link
        const title = toString(node)
        headings.push({
          id: node.data?.id || slug(title),
          depth: node.depth,
          type:
            node.children.find((node) => node.type !== "text")?.type || "text",
          title,
        });
      }
    };

    visit(tree, "heading", visitor);

    /**
     * equivalence to
     *
     * export const headings = [...]
     */
    // const tocExport = {
    //   type: "mdxjsEsm",
    //   data: {
    //     estree: {
    //       type: "Program",
    //       sourceType: "module",
    //       body: [
    //         {
    //           type: "ExportNamedDeclaration",
    //           specifiers: [],
    //           source: null,
    //           declaration: {
    //             type: "VariableDeclaration",
    //             kind: "const",
    //             declarations: [
    //               {
    //                 type: "VariableDeclarator",
    //                 id: {
    //                   type: "Identifier",
    //                   name: "headings",
    //                 },
    //                 init: valueToEstree(headings),
    //               },
    //             ],
    //           },
    //         },
    //       ],
    //     },
    //   },
    // };
    // tree.children.push(tocExport);
  };
}
