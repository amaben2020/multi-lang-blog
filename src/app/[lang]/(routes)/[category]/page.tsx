import { DirectusService } from "@/src/app/services/api/directus";
import { notFound } from "next/navigation";
import { cache } from "react";

const { getCategories } = new DirectusService();
export const fetchCategoryData = cache(getCategories);

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
