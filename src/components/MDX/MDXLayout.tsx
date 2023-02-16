import React, { useRef } from "react";
import Catalog from "@/components/Catalog";
import { CalendarIcon, TagIcon } from "@heroicons/react/24/solid";

const MDXPage = ({ children, data }) => {
  const {
    frontmatter: { title, date, tags },
    headings,
  } = data.mdx;
  const postRef = useRef(null);

  return (
    <main ref={postRef} className="mx-auto max-w-[80rem]">
      <section className="my-2 xl:my-6 xl:grid xl:grid-cols-8">
        <div className="xl:col-span-6 xl:col-start-1">
          <h2 className="mb-2 text-3xl font-bold dark:text-white">{title}</h2>
          <div className="flex gap-2 text-sm text-gray-500">
            {/* Created Date */}
            <time className="tag">
              <CalendarIcon className="w-3" />
              <span>{date}</span>
            </time>
            {/* Tags */}
            {tags &&
              tags.map((tag) => (
                <div className="tag" key={tag}>
                  <TagIcon className="w-3" />
                  {tag}
                </div>
              ))}
          </div>
        </div>
      </section>
      <section className="xl:grid xl:grid-cols-8">
        <article className="prose rounded-lg bg-white p-5 shadow-lg dark:prose-invert dark:bg-gray-800 xl:col-span-7 xl:col-start-1 xl:p-10">
          {children}
        </article>
        <aside className="ml-2 hidden w-80 xl:block">
          <Catalog
            ref={postRef}
            className="sticky top-16 flex w-full flex-col"
            headings={headings ?? []}
          />
        </aside>
      </section>
    </main>
  );
};

export default MDXPage;
