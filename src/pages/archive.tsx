import React from "react";
import { Link, graphql } from "gatsby";

const Archive = (props) => {
  const archiveList = props.data.allMarkdownRemark.edges.map((edge) => {
    return {
      title: edge.node.frontmatter.title,
      date: edge.node.frontmatter.date,
    };
  });

  return (
    <div>
      {archiveList.map((page) => (
        <>
          <div>{page.title}</div>
          <div>{page.date}</div>
        </>
      ))}
    </div>
  );
};

export default Archive;

export const ArchiveQuery = graphql`
  query ArchiveQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
          }
        }
      }
    }
  }
`;
