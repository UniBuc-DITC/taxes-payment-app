'use client'

import { Link } from "@/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import { usePathname } from "next/navigation";


export default function NavBar() {
  const pathname = usePathname();
  const isAdmin = pathname.includes('/admin');
  if (!isAdmin) {
    return (
      <div className="bg-blue-400 ">
        <div className="max-w-7xl flex w-full justify-between gap-5 items-center mx-auto">
          <Link href="/">Home</Link>
          <LocaleSwitcher />
        </div>
      </div>
    );
  }
}
