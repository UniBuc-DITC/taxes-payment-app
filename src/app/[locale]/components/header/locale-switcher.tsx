"use client";
import { Link, usePathname } from "@/i18n/navigation";

export default function LocaleSwitcher() {
  const pathname = usePathname();

  return (
    <div className="flex gap-5 items-center">
      <Link href={pathname} locale="ro">
        ro 🇷🇴
      </Link>
      <Link href={pathname} locale="en">
        en 🇬🇧
      </Link>
    </div>
  );
}
