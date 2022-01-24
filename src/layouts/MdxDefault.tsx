import React, { useRef } from "react";
import { MDXProvider } from "@mdx-js/react";
import Catalog from "@/components/Catalog";
import MDXComponent from "@/components/MDXComponents";

export default function MDXPage({ children, pageContext }) {
  const { title } = pageContext.frontmatter;
  const postRef = useRef(null);

  return (
    <div ref={postRef} className="prose dark:prose-invert">
      <h2>{title}</h2>
      <div className="bg-white py-3 px-5 lg:px-20 shadow-lg rounded-lg">
        <MDXProvider components={MDXComponent}>{children}</MDXProvider>
      </div>
      <Catalog
        className="absolute right-0 top-16 transition hidden xl:flex flex-col"
        headings={pageContext.headings}
        postReference={postRef}
      />
    </div>
  );
}
