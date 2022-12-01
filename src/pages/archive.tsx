import React from "react";
import { Link, graphql } from "gatsby";

const Archive = ({ data }) => {
  const archiveList = data.allMdx.nodes.map((node) => {
    return {
      link: node.fields.slug,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
    };
  });

  return (
    <div className="mx-auto flex max-w-[40rem] flex-col gap-2 px-2">
      {archiveList.map((page) => (
        <Link to={`/${page.link}`} key={page.link}>
          <div className="cursor-pointer select-none rounded-lg bg-white p-4 shadow transition hover:shadow-lg dark:bg-gray-800 dark:text-white dark:hover:shadow-gray-800">
            <div className="font-bold">{page.title}</div>
            <span className="text-sm">{page.date}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Archive;

export const ArchiveQuery = graphql`
  query ArchiveQuery {
    allMdx(sort: { order: DESC, fields: frontmatter___date }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
        }
      }
    }
  }
`;
