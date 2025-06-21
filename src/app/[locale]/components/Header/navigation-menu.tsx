"use client";

import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";

import { RxHamburgerMenu } from "react-icons/rx";

import { Link } from "@/i18n/navigation";
import classNames from "classnames";

export default function NavigationMenu() {
  const t = useTranslations("Common.Navigation");

  const [menuShown, setMenuShown] = useState(false);

  const handleOnClick = useCallback(() => {
    setMenuShown((shown) => !shown);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={handleOnClick}
        className="cursor-pointer mx-3 flex items-center"
      >
        <RxHamburgerMenu size={32} />
      </button>
      <div
        className={classNames(
          "min-w-32 flex flex-col absolute top-8 right-0 bg-blue-900 text-white",
          menuShown ? "" : "hidden",
        )}
      >
        <Link href="/admission-taxes" className="px-2 py-1 hover:bg-blue-700">
          {t("admissionTaxes")}
        </Link>
        <Link href="/tuition-taxes" className="px-2 py-1 hover:bg-blue-700">
          {t("tuitionTaxes")}
        </Link>
        <Link
          href="/accommodation-taxes"
          className="px-2 py-1 hover:bg-blue-700"
        >
          {t("accommodationTaxes")}
        </Link>
      </div>
    </div>
  );
}
