import React, { createElement, PropsWithChildren } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import Link from "next/link";

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

const ALink = ({ as, id, children }: HeaderProps) => {
  return createElement(as, {
    id,
    className: "relative mt-2 group",
    children: (
      <>
        <a
          href={`#${id}`}
          className="absolute -translate-x-full pr-1 opacity-0 transition-opacity group-hover:opacity-100"
        >
          #
        </a>
        {children}
      </>
    ),
  });
};

const components = {
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
        href={href}
        className="underline decoration-dashed underline-offset-4"
      >
        {props.children}
      </Link>
    );
  },
  img: ({ src, ...props }) => {
    let zoom = 100;
    if (src.startsWith("http")) {
      const url = new URL(src);
      const params = url.searchParams;
      const _zoom = parseInt(params.get("zoom"), 10);
      zoom = Number.isNaN(_zoom) ? 100 : _zoom;
    }
    return (
      <>
        <img
          src={src}
          decoding="async"
          alt={props.alt}
          style={{ zoom: `${zoom}%` }}
        />
        {props.alt && (
          <span className="mt-2 block text-center text-xs">{props.alt}</span>
        )}
      </>
    );
  },
  code: (props) => (
    <code className="rounded bg-gray-100 px-1 text-purple-700 dark:bg-gray-700 dark:text-purple-300">
      {props.children}
    </code>
  ),
  blockquote: (props) => (
    <blockquote className="text-sm text-gray-500">{props.children}</blockquote>
  ),
};

export default components;
