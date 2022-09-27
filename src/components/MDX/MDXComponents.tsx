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
  img: (props) => {
    const params = new URL(props.src).searchParams;
    const zoom = params.get("zoom") ?? 100;
    return (
      <span>
        <figure>
          <img
            src={props.src}
            decoding="async"
            alt={props.alt}
            style={{ zoom: `${zoom}%` }}
          />
          {props.alt && (
            <figcaption className="text-center text-xs">{props.alt}</figcaption>
          )}
        </figure>
      </span>
    );
  },
  code: (props) => (
    <code className="text-purple-700 dark:text-purple-300 bg-gray-100 dark:bg-gray-700 rounded px-1">
      {props.children}
    </code>
  ),
};

export default components;
