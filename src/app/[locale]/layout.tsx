import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n";

import "./globals.css";

import NavBar from "@/components/reusable/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aplicație plată online taxe",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default async function RootLayout({
  children,
  params: { locale },
}: LayoutProps) {
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
