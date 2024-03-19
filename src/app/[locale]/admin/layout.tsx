import { NextIntlClientProvider, useMessages } from "next-intl";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default function AuthLayout({
  children,
}: LayoutProps) {
  const messages = useMessages();

  return (
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
  );
}
