import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { unstable_setRequestLocale } from "next-intl/server";
import NavBar from "@/components/reusable/NavBar";

import { locales } from "@/i18n";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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

export default function RootLayout({
  children,
  params: { locale },
}: LayoutProps) {
  // Cache the request locale using a temporary API, to make it available to downstream components.
  // See https://next-intl-docs.vercel.app/docs/getting-started/app-router#add-unstable_setrequestlocale-to-all-layouts-and-pages for more details.
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NavBar />
        <main className="max-w-7xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
