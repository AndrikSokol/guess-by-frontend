"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useCurrentLocale } from "next-i18n-router/client";
import i18nConfig from "../../../i18nConfig";
import { PlanetIcon } from "../assets/planet-icon";
import { useEffect, useState } from "react";

const languagues = ["en", "ru", "be"];

export default function LanguageChanger() {
  const router = useRouter();
  const currentPathname = usePathname();
  const currentLocale = useCurrentLocale(i18nConfig);

  const [language, setLanguage] = useState<string>(currentLocale as string);
  const handleChange = (newLocale: string | undefined) => {
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  useEffect(() => {
    handleChange(language);
  }, [language]);

  return (
    <div
      onClick={() => {
        setLanguage((prev) => {
          const index = languagues.indexOf(language);
          return index === languagues.length - 1
            ? languagues[0]
            : languagues[index + 1];
        });
      }}
      className="flex gap-2 items-center justify-center cursor-pointer"
    >
      <PlanetIcon className="w-8 h-8  " />
      <div>{language.slice(0, 1).toUpperCase() + language.slice(1)}</div>
    </div>
  );
}
