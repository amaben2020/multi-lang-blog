const dict = {
  en: () => import("./../../dictionary/en.json").then((res) => res.default),
  de: () => import("./../../dictionary/de.json").then((res) => res.default),
};

export const getLanguageFromDictionary = async (locale: "en" | "de") => {
  const language = await dict[locale]();

  return language;
};
