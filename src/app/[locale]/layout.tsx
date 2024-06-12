import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "@/app/globals.css";
import { AppProvider } from "@/app/components/app-provider";
import i18nConfig from "../../../i18nConfig";
import getIntl from "@/app/intl";
import { ServerIntlProvider } from "@/app/components/server-intl-provider";
import { cookies } from "next/headers";

const oswald = Oswald({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geo Game",
  description: "Simple game to guess a place in Belarus"
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  aside,
  modal
}: {
  children: React.ReactNode;

  aside: React.ReactNode;
  modal: React.ReactNode;
}) {
  const cookie = cookies();
  const locale = cookie.get("NEXT_LOCALE")?.value || "en";
  const intlAside = await getIntl(locale, "aside");
  const intlAuthCommon = await getIntl(locale, "common");
  const intlAuthLogin = await getIntl(locale, "login-modal");
  const intlAuthSignup = await getIntl(locale, "register-modal");
  const intlAbout = await getIntl(locale, "about");
  const intlProfile = await getIntl(locale, "profile");
  const intlRoom = await getIntl(locale, "room");
  return (
    <html lang={locale}>
      <body className={oswald.className}>
        <AppProvider>
          <ServerIntlProvider
            messages={{
              ...intlAside.messages,
              ...intlAuthCommon.messages,
              ...intlAuthLogin.messages,
              ...intlAuthSignup.messages,
              ...intlAbout.messages,
              ...intlProfile.messages,
              ...intlRoom.messages
            }}
            locale={intlAuthCommon.locale}
          >
            {aside}
            {modal}
            {children}
          </ServerIntlProvider>
        </AppProvider>
      </body>
    </html>
  );
}
