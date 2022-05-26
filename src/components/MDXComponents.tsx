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

const HeaderClass = "relative mt-2 group";

const ALink = ({ id }) => (
  <a
    href={`#${id}`}
    className="absolute -translate-x-full pr-1 opacity-0 group-hover:opacity-100 transition-opacity"
  >
    #
  </a>
);

const components: MDXProviderComponentsProp = {
  code: Code,
  h1: ({ ...props }) => {
    return <h1 className={HeaderClass} {...props} />;
  },
  h2: ({ ...props }) => (
    <h2 className={HeaderClass} {...props}>
      <ALink id={props.id} />
      {props.children}
    </h2>
  ),
  h3: ({ ...props }) => (
    <h3 className={HeaderClass} {...props}>
      <ALink id={props.id} />
      {props.children}
    </h3>
  ),
  h4: ({ ...props }) => (
    <h4 className={HeaderClass} {...props}>
      <ALink id={props.id} />
      {props.children}
    </h4>
  ),
  pre: ({ ...props }) => <pre className="dark:bg-gray-800" {...props} />,
  a: ({ ...props }) => (
    <a className="underline decoration-dashed underline-offset-4" {...props} />
  ),
};

export default components;
