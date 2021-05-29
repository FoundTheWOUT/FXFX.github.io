import React from "react";
import { StaticQuery, Link, graphql } from "gatsby";
// import Pagination from '../components/Pagination'

const PostList = () => (
  <StaticQuery
    query={graphql`
      query ListQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              fields {
                slug
              }
              excerpt(pruneLength: 250)
              frontmatter {
                date
                title
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const postList = data.allMarkdownRemark;
      return (
        <>
        <div>
          {postList.edges.map(({ node }, i) => (
            <Link to={node.fields.slug} key={i} className="link">
              <div className="post-list">
                <h1>{node.frontmatter.title}</h1>
                <span>{node.frontmatter.date}</span>
                <p>{node.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        {/* <Pagination/> */}
        </>
      );
    }}
  />
);
export default PostList;
