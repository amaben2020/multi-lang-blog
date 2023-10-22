import { MetadataRoute } from "next";
import { DirectusService } from "./services/api/directus";

export default async function sitemap(): Promise<
  MetadataRoute.Sitemap | undefined
> {
  // loop through the category and return the url shape

  const directusService = new DirectusService();
  const { categoriesEn, categories } =
    await directusService.getCategoriesForSlug();
  let deutscheConfig: Array<{ lang: "de"; slug: string }> = [];

  categories?.data?.forEach((category) => {
    category.translations.forEach((item: any) => {
      deutscheConfig.push({
        lang: "de",
        slug: item.slug,
      });
    });
  });

  const categoryData = categoriesEn?.concat(deutscheConfig!);

  // concatenate post array here and flatten

  return categoryData?.map((elem) => {
    return {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${elem.lang}/${elem.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    };
  });
}
