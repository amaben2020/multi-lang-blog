import { notFound } from "next/navigation";
import { cache } from "react";
import directus from "../../lib/directus";

export const fetchCategoryData = cache(
  async (category: string, lang: "en" | "de") => {
    try {
      const categoryData = await directus.items("category").readByQuery({
        filter: {
          slug: {
            _eq: category,
          },
        },

        fields: ["*", "translations.*", "category.translations.*"],
      });
      if (lang == "en") {
        return categoryData.data;
      } else if (lang == "de") {
        const deutcheCategory = await directus.items("category").readByQuery({
          fields: ["*", "translations.*", "category.translations.*"],
        });

        // TODO: look for how to resolve this with query rather than JS
        return deutcheCategory?.data
          ?.filter((category) => category.translations[0].slug === category)
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
  },
);

const Category = async ({
  params,
}: {
  params: { category: string; lang: "en" | "de" };
}) => {
  const category = (await fetchCategoryData(
    params.category,
    params.lang,
  )) as unknown as {
    title: string;
    description: string;
  }[];

  if (!category) {
    notFound();
  }

  return (
    <div>
      Category :{category[0]?.title}
      {category[0]?.description}
    </div>
  );
};

export default Category;
