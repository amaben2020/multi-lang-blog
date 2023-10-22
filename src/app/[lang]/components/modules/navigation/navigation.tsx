//@ts-nocheck
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLanguageFromDictionary } from "../../../lib/dictionary";

const Navigation = ({ locale }: { locale: "en" | "de" }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [languageData, setLanguageData] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // get the pathname
  // const pathname = usePathname();

  // console.log(pathname);
  // switch and change the url based on the locale

  const languageSwitcher = () => {
    if (locale === "en") {
      return "de";
    } else {
      return "en";
    }
  };

  getLanguageFromDictionary(locale).then((res) => setLanguageData(res.header));

  const links = [
    {
      title: languageData?.category.cities,
      url: `/${locale}/${languageData?.category.cities}`,
    },
    {
      title: languageData?.category.experiences,
      url: `/${locale}/${languageData?.category.experiences}`,
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

      <div className="flex justify-around text-white">
        {links.map((elem) => (
          <div key={elem.title}>
            <Link href={elem.url} className="mx-4">
              {elem.title}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
