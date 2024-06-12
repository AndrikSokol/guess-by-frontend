"use client";

import { IntlProvider } from "react-intl";

type ServerIntlProviderProps = {
  messages: any;
  locale: string;
  children: React.ReactNode;
};
export const ServerIntlProvider = ({
  messages,
  locale,
  children
}: ServerIntlProviderProps) => {
  return (
    <IntlProvider messages={messages} locale={locale}>
      {children}
    </IntlProvider>
  );
};
