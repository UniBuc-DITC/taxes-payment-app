import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import classNames from "classnames";

import { routing } from "@/i18n/routing";
import Header from "./components/header";
import Footer from "./components/footer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aplicație plată online taxe",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body
        className={classNames(
          inter.className,
          "grid grid-rows-[min-content_1fr]",
        )}
      >
        <NextIntlClientProvider>
          {/* Spacer. See https://www.smashingmagazine.com/2024/09/sticky-headers-full-height-elements-tricky-combination/ */}
          <div className="h-screen col-span-full row-[1/span_3]"></div>
          <Header
            locale={locale}
            className="sticky top-0 z-50 row-start-1 col-start-1"
          />
          <main className="row-start-2 col-start-1">{children}</main>
          <Footer
            locale={locale}
            className="sticky bottom-0 z-50 row-start-3 col-start-1"
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
