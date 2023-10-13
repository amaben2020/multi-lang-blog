"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Navigation = ({ locale }: { locale: "en" | "de" }) => {
  const [isMounted, setIsMounted] = useState(false);

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

  //

  const languageSwitcher = () => {
    if (locale === "en") {
      return "de";
    } else {
      return "en";
    }
  };

  return (
    <nav className="p-10">
      <Link
        href={`/${languageSwitcher()}`}
        className="border p-4 px-5 rounded-lg text-white"
      >
        {locale === "en" ? "DE  🇩🇪" : "EN  🇬🇧"}
      </Link>
    </nav>
  );
};

export default Navigation;
