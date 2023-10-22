import { DirectusService } from "@/src/app/services/api/directus";
import { notFound } from "next/navigation";
import { cache } from "react";
import directus from "../../lib/directus";

const { getCategories } = new DirectusService();
const fetchCategoryData = cache(getCategories);

export async function generateStaticParams() {
  const categories = await directus.items("category").readByQuery({
    filter: {
      status: {
        _eq: "published",
      },
    },

    fields: ["slug", "translations*"],
  });

  const params = categories.data?.map((category) => ({
    slug: category.slug,
    lang: "en",
  }));

  console.log(categories);

  const localizedParams = categories.data?.map((category) => ({
    slug: category.slug,
    lang: "de",
  }));

  return params?.concat(localizedParams!) ?? [];
}

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
