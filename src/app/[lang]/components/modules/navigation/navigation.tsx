// "use client";

import Link from "next/link";
import { getLanguageFromDictionary } from "../../../lib/dictionary";
import { TLanguageData } from "./types";

const Navigation = async ({ locale }: { locale: "en" | "de" }) => {
  // const [isMounted, setIsMounted] = useState(false);
  // const [languageData, setLanguageData] = useState<TLanguageData>({
  //   header: {
  //     title: "",
  //     description: "",
  //     category: {
  //       cities: "",
  //       experiences: "",
  //     },
  //   },
  //   footer: {
  //     mainText: "",
  //   },
  // });

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  const languageSwitcher = () => {
    // ensure that when the language is switched on any path, it simply appends to it rather than bring you back to home route
    if (locale === "en") {
      return "de";
    } else {
      return "en";
    }
  };

  const languageData: TLanguageData = await getLanguageFromDictionary(locale);

  // if (!isMounted) {
  //   return null;
  // }
  const links = [
    {
      title: languageData?.header?.category?.cities,
      url: `/${locale}/${languageData?.header?.category.cities}`,
    },
    {
      title: languageData?.header?.category.experiences,
      url: `/${locale}/${languageData?.header?.category.experiences}`,
    },
  ];

  return (
    <nav className="p-10 flex justify-between">
      <div>
        <Link
          href={`/${languageSwitcher()}`}
          className="border p-4 px-5 rounded-lg text-white"
        >
          {locale === "en" ? "DE  🇩🇪" : "EN  🇬🇧"}
        </Link>
      </div>

      {languageData.header && (
        <div className="flex justify-around">
          {links?.map((elem) => (
            <Link
              key={elem.title}
              href={elem.url}
              className="mx-4 cursor-pointer hover:text-gray-300 border p-2 rounded-xl text-white text-2xl max-w-[180px] text-center"
            >
              {elem.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
