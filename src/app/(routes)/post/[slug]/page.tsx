import { DUMMY_POSTS } from "@/mock/data";

export const generateStaticParams = async () => {
  return DUMMY_POSTS.map((post) => ({
    slug: post.slug,
  }));
};

const Post = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const { slug } = params;
  const singlePost = DUMMY_POSTS.find((post) => post.slug.includes(slug));

  // const singlePost2 =
  //   DUMMY_POSTS[DUMMY_POSTS.findIndex((elem) => elem.slug === params.slug)];

  // console.log(singlePost2);

  return (
    <div>
      <h2>{singlePost?.title}</h2>
    </div>
  );
};

export default Post;
