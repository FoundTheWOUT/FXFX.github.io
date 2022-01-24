import React from "react";
import { Link, graphql } from "gatsby";
import Pagination from "@/components/Pagination";
import nightwind from "nightwind/helper";
import TrackMouse from "@/components/TrackMouse";
import ImgLazy from "@/components/ImgLazy";

const PostList = (props) => {
  const postList = props.data.allMdx.edges;
  return (
    <div>
      <script dangerouslySetInnerHTML={{ __html: nightwind.init() }} />
      <div>
        {postList.map(({ node }, i) => (
          <Link
            key={node.frontmatter.title}
            to={node.fields.path}
            className="group"
          >
            <div className="relative mb-20 h-60 shadow-2xl rounded-lg md:h-96 md:shadow-none">
              <div className="rounded-lg h-full w-full overflow-hidden md:w-3/5 md:h-4/5 md:shadow-lg lg:w-1/2">
                <ImgLazy src={node.frontmatter.image} />
              </div>
              <div className="h-36 w-full box-border px-3 absolute -bottom-10 md:-bottom-0 md:right-0 lg:right-0 md:h-3/5 md:w-3/5 ">
                <TrackMouse>
                  <div className="h-full p-3 bg-white bg-opacity-90 rounded-lg flex items-center justify-center group-hover:shadow-2xl transform transition">
                    <div className="w-full md:w-4/5">
                      <h1 className="text-xl font-semibold text-black">
                        {node.frontmatter.title}
                      </h1>
                      <span className="text-black">
                        {node.frontmatter.date}
                      </span>
                      <p className="text-sm text-gray-500">{node.excerpt}</p>
                    </div>
                  </div>
                </TrackMouse>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination pageContext={props.pageContext} />
    </div>
  );
};

export default PostList;

export const ListQuery = graphql`
  query ListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            path
          }
          excerpt(truncate: true, pruneLength: 50)
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            image
          }
        }
      }
    }
  }
`;
