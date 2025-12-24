import Image from "next/image";
import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import classNames from "classnames";

import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./locale-switcher";

import NavigationMenu from "./navigation-menu";

import logoRo from "./images/unibuc-logo-white-ro.png";
import logoEn from "./images/unibuc-logo-white-en.png";

type Props = {
  locale: Locale;
  className: string;
};

export default async function Header({ locale, className }: Props) {
  const navigationT = await getTranslations({
    locale,
    namespace: "Common.Navigation",
  });
  const t = await getTranslations({ locale, namespace: "Header" });
  return (
    <div
      className={classNames(
        "bg-blue-900 text-white flex flex-row py-2",
        className,
      )}
    >
      <Link
        href="/"
        title={navigationT("home")}
        className="flex flex-row justify-center items-center mx-1 px-2"
      >
        <Image
          src={locale == "ro" ? logoRo : logoEn}
          width={200}
          height={100}
          alt={t("logo")}
        />
      </Link>
      <div className="max-w-7xl flex w-full justify-between gap-5 items-center mx-2">
        <LocaleSwitcher />
      </div>
      <NavigationMenu />
    </div>
  );
}
