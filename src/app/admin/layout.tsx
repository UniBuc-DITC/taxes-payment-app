"use client";

import SessionWrapper from "@/components/SessionWrapper";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import "./globals.css";

type LayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <SessionWrapper>
      <body className={inter.className}>
          {children}
      </body>
    </SessionWrapper>
  );
}
