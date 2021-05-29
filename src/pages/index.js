import * as React from "react";
import PostList from "../templates/post-list";
import Common from "../components/Common";

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

// markup
const IndexPage = () => {
  return (
    <Common style={pageStyles}>
      <PostList />
    </Common>
  );
};

export default IndexPage;
