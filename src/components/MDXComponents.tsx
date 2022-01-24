import React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { MDXProviderComponentsProp } from "@mdx-js/react";

const Code = ({ children, ...props }) => {
  const highlighted = hljs.highlightAuto(children);
  return (
    <code {...props} dangerouslySetInnerHTML={{ __html: highlighted.value }} />
  );
};

const components: MDXProviderComponentsProp = {
  code: Code,
  h2: ({ ...props }) => <h2 className="header" {...props} />,
  h3: ({ ...props }) => <h3 className="header" {...props} />,
  h4: ({ ...props }) => <h4 className="header" {...props} />,
  pre: ({ ...props }) => <pre className="dark:bg-gray-800" {...props} />,
};

export default components;
