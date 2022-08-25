import React, { useRef } from "react";
import { MDXProvider } from "@mdx-js/react";
import Catalog from "@/components/Catalog";
import MDXComponent from "@/components/MDXComponents";
import { FaCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";

export default function MDXPage({ children, pageContext }) {
  const { title, date } = pageContext.frontmatter;
  const postRef = useRef(null);

  return (
    <main ref={postRef} className="max-w-[80rem] mx-auto px-2">
      <section className="lg:grid lg:grid-cols-8 my-2 lg:my-6">
        <div className="lg:col-start-2 lg:col-span-6">
          <h2 className="text-3xl font-bold mb-1 dark:text-white">{title}</h2>
          <div className="text-gray-500 text-sm ml-1">
            <time className="flex items-center">
              <FaCalendarAlt />
              <span className="ml-1">{dayjs(date).format("YYYY-MM-DD")}</span>
            </time>
          </div>
        </div>
      </section>
      <section className="lg:grid lg:grid-cols-8">
        <article className="prose dark:prose-invert dark:bg-gray-800 lg:col-span-6 lg:col-start-2 bg-white p-5 lg:p-10 shadow-lg rounded-lg">
          <MDXProvider components={MDXComponent}>{children}</MDXProvider>
        </article>
        <aside className="ml-2 hidden xl:block w-80">
          <Catalog
            className="sticky flex flex-col top-16 w-full"
            headings={pageContext.headings}
            postReference={postRef}
          />
        </aside>
      </section>
    </main>
  );
}
