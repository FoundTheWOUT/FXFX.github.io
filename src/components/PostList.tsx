import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

function PostImage({ node }: { node: any }) {
  const router = useRouter();
  const rawSrc = node?.frontmatter?.image;
  const imageSrc =
    typeof rawSrc === "string"
      ? rawSrc.startsWith("http")
        ? rawSrc
        : `${router.basePath}${rawSrc}`
      : "";
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg shadow md:h-4/5 md:w-3/5 lg:w-1/2">
      {node.frontmatter.image ? (
        <Image
          alt=""
          fill
          sizes="(max-width: 768px) 100vw,
      (max-width: 1200px) 50vw,
      33vw"
          priority
          className="h-full w-full object-cover"
          decoding="async"
          src={imageSrc}
        />
      ) : (
        <div className="h-full w-full dark:bg-gray-500"></div>
      )}
    </div>
  );
}

function PostList({ data }: { data: any }) {
  const postList = data.allMdx.nodes;

  return (
    <main className="mx-auto max-w-6xl">
      <section>
        {postList.map((node) => (
          <Link
            key={node.frontmatter.title}
            href={`/posts/${node.fields.slug}`}
            className="group"
          >
            <div className="relative mb-20 h-60 rounded-lg md:h-96">
              <PostImage node={node} />
              {/* title */}
              <div className="absolute -bottom-10 box-border h-36 w-full px-3 md:-bottom-0 md:right-0 md:h-3/5 md:w-3/5 md:px-0 lg:right-0 ">
                <div className="flex h-full transform items-center justify-center rounded-lg bg-white p-3 transition group-hover:-translate-y-5 group-hover:shadow-2xl group-active:shadow-none dark:bg-gray-700 dark:hover:shadow-gray-800">
                  <div className="w-full md:w-4/5">
                    <h1 className="text-xl font-semibold text-black dark:text-white">
                      {node.frontmatter.title}
                    </h1>
                    <span className="text-black dark:text-gray-500">
                      {node.frontmatter.date}
                    </span>
                    <p className="break-all text-sm text-gray-500 dark:text-gray-300">
                      {node.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default PostList;
