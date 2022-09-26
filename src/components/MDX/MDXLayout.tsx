import React, { useRef } from "react";
import { MDXProvider } from "@mdx-js/react";
import Catalog from "@/components/Catalog";
import MDXComponent from "./MDXComponents";
import { FaCalendarAlt } from "react-icons/fa";
import { graphql } from "gatsby";
import SEO from "../Seo";

const MDXPage = ({ children, data }) => {
  const {
    frontmatter: { title, date },
    headings,
  } = data.mdx;
  const postRef = useRef(null);

  return (
    <main ref={postRef} className="max-w-[80rem] mx-auto px-2">
      <section className="lg:grid lg:grid-cols-8 my-2 lg:my-6">
        <div className="lg:col-start-2 lg:col-span-6">
          <h2 className="text-3xl font-bold mb-1 dark:text-white">{title}</h2>
          <div className="text-gray-500 text-sm ml-1">
            <time className="flex items-center">
              <FaCalendarAlt />
              <span className="ml-1">{date}</span>
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
            ref={postRef}
            className="sticky flex flex-col top-16 w-full"
            headings={headings ?? []}
          />
        </aside>
      </section>
    </main>
  );
};

export default MDXPage;

export const Head = ({ pageContext }) => (
  <SEO title={pageContext.frontmatter.title} />
);

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
      }
      headings {
        id
        value
        depth
      }
    }
  }
`;
