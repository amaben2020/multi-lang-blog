import { notFound } from "next/navigation";
import directus from "../../lib/directus";

// export const generateStaticParams = async () => {
//   try {
//     const category: Awaited<any> = await directus
//       .items("category")
//       .readByQuery({
//         filter: {
//           status: {
//             _eq: "published",
//           },
//         },
//       });

//     return category.data?.map((category: any) => ({
//       category: `en/${category.slug}`,
//     }));
//   } catch (error) {
//     console.log(error);
//   }
// };

const Category = async ({
  params,
}: {
  params: { category: string; lang: string };
}) => {
  const fetchCategory = async () => {
    try {
      const category = await directus.items("category").readByQuery({
        filter: {
          slug: {
            _eq: params.category,
          },
        },

        fields: ["*", "translations.*", "category.translations.*"],
      });
      if (params.lang == "en") {
        return category.data;
      } else if (params.lang == "de") {
        const deutcheCategory = await directus.items("category").readByQuery({
          fields: ["*", "translations.*", "category.translations.*"],
        });

        console.log(deutcheCategory?.data);

        // TODO: look for how to resolve this with query
        return deutcheCategory?.data
          ?.filter(
            (category) => category.translations[0].slug === params.category,
          )
          .map((category) => ({
            id: category.translations[0].id,
            title: category.translations[0].title,
            slug: category.translations[0].slug,
            description: category.translations[0].description,
          }));
      }
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

  console.log("Category", category);

  return (
    <div>
      Category :{category[0]?.title}
      {category[0]?.description}
    </div>
  );
};

export default Category;
