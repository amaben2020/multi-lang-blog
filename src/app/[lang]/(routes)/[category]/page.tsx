import { DUMMY_POSTS } from "@/mock/data";
import { notFound } from "next/navigation";
import directus from "../../lib/directus";

export const generateStaticParams = async () => {
  try {
    const category: Awaited<any> = await directus
      .items("category")
      .readByQuery({
        filter: {
          status: {
            _eq: "published",
          },
        },
      });

    return category.data?.map((category: any) => ({ category: category.slug }));
  } catch (error) {
    console.log(error);
  }
};

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

  const category = (await fetchCategory()) as unknown as {
    title: string;
    description: string;
  }[];

  if (!category) {
    notFound();
  }

  return (
    <div>
      Category :
      {singlePost?.map((post) => (
        <>{}</>
      ))}
      {category[0]?.title}
      {category[0]?.description}
    </div>
  );
};

export default Category;
