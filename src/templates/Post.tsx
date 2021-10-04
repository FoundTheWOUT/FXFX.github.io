import React, { useEffect, useRef, useState } from "react";
import { graphql } from "gatsby";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import Catalog from "@/components/Catalog";

const Post = (props) => {
  const post = props.data.markdownRemark;
  const { title } = post.frontmatter;
  useEffect(() => {
    hljs.highlightAll();
  }, [post.html]);

  const postRef = useRef(null);
  const [CatalogHeight, SetCatalogHeight] = useState(0);
  const [CatalogActive, SetCatalogActive] = useState(null);
  useEffect(() => {
    document.addEventListener("scroll", handlePostWheel);
    return () => {
      document.removeEventListener("scroll", handlePostWheel);
    };
  }, [postRef]);
  const handlePostWheel = () => {
    const { top } = postRef.current.getBoundingClientRect();
    top < 0 ? SetCatalogHeight(-top) : SetCatalogHeight(0);

    for (let i = post.headings.length - 1; i >= 0; i--) {
      const headerTop = document
        .querySelector(`#${post.headings[i].id}`)
        .getBoundingClientRect().top;
      if (headerTop <= 100) {
        SetCatalogActive(post.headings[i].id);
        break;
      }
    }
  };

  return (
    <div ref={postRef} className="max-w-[1500px]">
      <div className="prose dark:prose-light max-w-none w-full text-black">
        <h1>{title}</h1>
        <div
          className="bg-white bg-opacity-90 px-5 lg:px-20 py-3 shadow-lg rounded-lg"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
      <div
        className="absolute right-0 top-16 transition"
        style={{ transform: `translate(calc(100% + 10px),${CatalogHeight}px)` }}
      >
        <Catalog
          activeId={CatalogActive}
          className="hidden lg:flex"
          headers={post.headings}
        ></Catalog>
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
      headings {
        value
        depth
        id
      }
    }
  }
`;
