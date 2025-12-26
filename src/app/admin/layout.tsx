"use client";

import { Inter } from "next/font/google";

import SessionWrapper from "@/components/admin/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

import "./globals.css";

type LayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <html lang="ro">
      <body className={inter.className}>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
