import { DirectusService } from "@/src/app/services/api/directus";
import { notFound } from "next/navigation";
import { cache } from "react";

const { getCategories, getCategoriesForSlug } = new DirectusService();
const fetchCategoryData = cache(getCategories);

export async function generateStaticParams() {
  const { categoriesEn, categories } = await getCategoriesForSlug();

  let deutscheConfig: Array<{ lang: "de"; slug: string }> = [];

  categories?.data?.forEach((category) => {
    category.translations.forEach((item: any) => {
      deutscheConfig.push({
        lang: "de",
        slug: item.slug,
      });
    });
  });

  return categoriesEn?.concat(deutscheConfig!) ?? [];
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

  if (!category[0]?.title) {
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
