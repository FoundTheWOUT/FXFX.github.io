import React from "react";
import { graphql } from "gatsby";
// import Common from '../components/Common'

const Post = (props) => {
  const post = props.data.markdownRemark;
  const { title, date } = post.frontmatter;
  return (
    // <Common>
    <>
      <h1>{title}</h1>
      <div class="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    </>
  );
};
export default Post;

export const PostQuery = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date
        title
      }
    }
  }
`;
