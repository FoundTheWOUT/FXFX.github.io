import React from "react";
import { graphql } from "gatsby";

const Post = (props) => {
  const post = props.data.markdownRemark;
  const { title } = post.frontmatter;
  return (
      <div className="flex flex-col items-center">
        <div className="prose dark:prose-light max-w-none w-full text-black">
          <h1>{title}</h1>
          <div className="bg-white bg-opacity-90 px-20 py-3 shadow-lg rounded-lg" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
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
