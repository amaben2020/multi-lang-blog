import directus from "./../../../app/[lang]/lib/directus";

export class DirectusService {
  async getCategories(category: string, lang: "en" | "de") {
    console.log(lang);
    try {
      const categoryData = await directus.items("category").readByQuery({
        filter: {
          slug: {
            _eq: String(category),
          },
        },
        fields: ["*", "translations.*", "category.translations.*"],
      });

      console.log("categoryData", categoryData);
      if (lang == "en") {
        return categoryData.data;
      } else if (lang == "de") {
        const deutcheCategory = await directus.items("category").readByQuery({
          fields: ["*", "translations.*", "category.translations.*"],
        });

        console.log(deutcheCategory);

        // TODO: look for how to resolve this with query rather than JS
        return deutcheCategory?.data
          ?.filter(
            (categoryItem) => categoryItem.translations[0].slug == category,
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
  }
  async getCategory() {}
  async getPosts() {}
  async getPost() {}
}
