import React from "react";
import { Link, graphql } from "gatsby";
import Pagination from "@/components/Pagination";
import TrackMouse from "@/components/TrackMouse";
import SEO from "./Seo";

const PostList = ({ data, pageContext }) => {
  const postList = data.allMdx.nodes;
  return (
    <main className="mx-auto max-w-[80rem] px-2">
      <section>
        {postList.map((node) => (
          <Link
            key={node.frontmatter.title}
            to={node.fields.slug}
            className="group"
          >
            <div className="relative mb-20 h-60 shadow-2xl rounded-lg md:h-96 md:shadow-none">
              <div className="rounded-lg h-full w-full overflow-hidden md:w-3/5 md:h-4/5 md:shadow-lg lg:w-1/2">
                {node.frontmatter.image ? (
                  <img
                    className="h-full w-full object-cover"
                    decoding="async"
                    src={node.frontmatter.image}
                  />
                ) : (
                  <div className="h-full w-full dark:bg-gray-500"></div>
                )}
              </div>
              <div className="h-36 w-full box-border px-3 absolute -bottom-10 md:-bottom-0 md:right-0 lg:right-0 md:h-3/5 md:w-3/5 ">
                <TrackMouse>
                  <div className="h-full p-3 bg-white dark:bg-gray-700 bg-opacity-90 rounded-lg flex items-center justify-center group-hover:shadow-2xl dark:hover:shadow-gray-800 transform transition">
                    <div className="w-full md:w-4/5">
                      <h1 className="text-xl font-semibold text-black dark:text-white">
                        {node.frontmatter.title}
                      </h1>
                      <span className="text-black dark:text-gray-500">
                        {node.frontmatter.date}
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {node.excerpt}
                      </p>
                    </div>
                  </div>
                </TrackMouse>
              </div>
            </div>
          </Link>
        ))}
      </section>
      <Pagination pageContext={pageContext} />
    </main>
  );
};

export default PostList;

export const Head = () => <SEO />;

export const ListQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    allMdx(
      filter: { frontmatter: { hide: { ne: true } } }
      sort: { order: DESC, fields: frontmatter___date }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        fields {
          slug
        }
        excerpt(pruneLength: 50)
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          image
        }
      }
    }
  }
`;
