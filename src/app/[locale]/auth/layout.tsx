import { NextIntlClientProvider, useMessages } from "next-intl";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default function AuthLayout({
  children,
  params: { locale },
}: LayoutProps) {
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
