import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

import "./globals.css";

import NavBar from "@/components/reusable/NavBar";
import { notFound } from "next/navigation";

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
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
