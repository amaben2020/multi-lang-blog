import { DUMMY_POSTS } from "@/mock/data";
import { notFound } from "next/navigation";
import directus from "../../lib/directus";

const Category = async ({ params }: { params: { category: string } }) => {
  const singlePost = DUMMY_POSTS.filter((post) =>
    post.category.title.toLowerCase().includes(params.category.toLowerCase()),
  );

  const fetchCategory = async () => {
    try {
      const category = await directus.items("category").readByQuery({
        filter: {
          slug: {
            _eq: params.category,
          },
        },
      });

      return category.data;
    } catch (error) {
      console.log(error);
    }
  };

  const category = await fetchCategory();

  if (!category) {
    notFound();
  }

  return (
    <div>
      Category :
      {singlePost?.map((post) => (
        <>{}</>
      ))}
      {category[0].title}
      {category[0].description}
    </div>
  );
};

export default Category;
