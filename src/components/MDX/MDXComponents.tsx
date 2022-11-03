import React, { createElement, PropsWithChildren } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import type { MDXComponents } from "mdx/types";
import { Link } from "gatsby";

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
  a: ({ href, ...props }) => {
    if (href.startsWith("http")) {
      return (
        <a
          href={href}
          target="_blank"
          className="underline decoration-dashed underline-offset-4"
          {...props}
        />
      );
    }
    return (
      <Link
        to={href}
        className="underline decoration-dashed underline-offset-4"
      >
        {props.children}
      </Link>
    );
  },
  img: (props) => {
    const params = new URL(props.src).searchParams;
    const zoom = params.get("zoom") ?? 100;
    return (
      <>
        <img
          src={props.src}
          decoding="async"
          alt={props.alt}
          style={{ zoom: `${zoom}%` }}
        />
        {props.alt && (
          <span className="text-xs block text-center mt-2">{props.alt}</span>
        )}
      </>
    );
  },
  code: (props) => (
    <code className="text-purple-700 dark:text-purple-300 bg-gray-100 dark:bg-gray-700 rounded px-1">
      {props.children}
    </code>
  ),
  blockquote: (props) => (
    <blockquote className="text-sm text-gray-500">{props.children}</blockquote>
  ),
};

export default components;
