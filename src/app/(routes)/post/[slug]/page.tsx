import { DUMMY_POSTS } from "@/mock/data";

const Post = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const singlePost = DUMMY_POSTS.find((post) =>
    post.slug.includes(params.slug),
  );

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
