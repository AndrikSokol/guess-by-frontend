"use server";

import { createIntl } from "@formatjs/intl";

export default async function getIntl(locale, namespace = "common") {
  const intl = createIntl({
    locale: locale,
    messages: (await import(`../../locales/${locale}/${namespace}.json`))
      .default
  });

  return intl;
}
