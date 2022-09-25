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
    <div className="max-w-[40rem] mx-auto flex flex-col gap-2 px-2">
      {archiveList.map((page) => (
        <Link to={`/${page.link}`} key={page.link}>
          <div className="bg-white dark:bg-gray-800 dark:text-white shadow dark:hover:shadow-gray-800 p-4 rounded-lg hover:shadow-lg transition cursor-pointer select-none">
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
