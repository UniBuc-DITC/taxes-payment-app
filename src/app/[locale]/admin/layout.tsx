"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default function AuthLayout({ children }: LayoutProps) {
  const { data: session, status, update } = useSession();
  /*
  useEffect(() => {
      console.log(session);
      const interval = setInterval(() => {
        update();
      }, 100000); 
      return () => clearInterval(interval);
  }, [update]); */

  return <div>{children}</div>;
}
