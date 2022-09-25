import React, { createElement, PropsWithChildren } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import type { MDXComponents } from "mdx/types";

const Pre = ({ children }) => {
  const { children: code, className } = children.props;
  const lang = className?.split("-")?.[1] ?? "text";
  const highlighted = hljs.highlight(code, { language: lang });
  return (
    <pre>
      <code dangerouslySetInnerHTML={{ __html: highlighted.value }} />
    </pre>
  );
};

type HeaderProps = PropsWithChildren<{ as: string; id: string }>;

const ALink = ({ as, id, children }: HeaderProps) =>
  createElement(as, {
    id,
    className: "relative mt-2 group",
    children: (
      <>
        <a
          href={`#${id}`}
          className="absolute -translate-x-full pr-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          #
        </a>
        {children}
      </>
    ),
  });

const components: MDXComponents = {
  h1: ({ ...props }: HeaderProps) => <ALink as="h1" {...props} />,
  h2: ({ ...props }: HeaderProps) => <ALink as="h2" {...props} />,
  h3: ({ ...props }: HeaderProps) => <ALink as="h3" {...props} />,
  h4: ({ ...props }: HeaderProps) => <ALink as="h4" {...props} />,
  pre: Pre,
  a: ({ ...props }) => (
    <a className="underline decoration-dashed underline-offset-4" {...props} />
  ),
};

export default components;
