import { getAllPosts } from "@/utils/posts";

function Post({ slug }) {
  console.log(slug);
  return <>{slug}</>;
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      slug: params.slug || null,
    },
  };
}

export default Post;
