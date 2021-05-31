import * as React from "react";
// import PostList from "../templates/PostList";
import nightwind from "nightwind/helper";

// markup
const IndexPage = () => {
  return (
    <div className="min-h-screen">
      <script dangerouslySetInnerHTML={{ __html: nightwind.init() }} />
    </div>
  );
};

export default IndexPage;
