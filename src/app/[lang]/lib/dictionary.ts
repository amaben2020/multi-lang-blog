const dict = {
  en: () => import("./../../dictionary/en.json").then((res) => res.default),
  de: () => import("./../../dictionary/de.json").then((res) => res.default),
};

export const getLanguageFromDictionary = async (
  locale: "en" | "de",
): Promise<{
  header: {
    title: string;
    description: string;
    category: {
      cities: string;
      experiences: string;
    };
  };
  footer: {
    mainText: string;
  };
}> => {
  const language = await dict[locale]();

  return language;
};
