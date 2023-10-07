import { DUMMY_POSTS } from "@/mock/data";

const Category = ({ params }: { params: { category: string } }) => {
  const singlePost = DUMMY_POSTS.find((post) =>
    post.category.title.toLowerCase().includes(params.category),
  );

  return <div>Category : {singlePost?.title}</div>;
};

export default Category;
