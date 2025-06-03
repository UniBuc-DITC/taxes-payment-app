import Image from "next/image";
import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "../LocaleSwitcher";

import logoRo from "./images/unibuc-logo-white-ro.png";
import logoEn from "./images/unibuc-logo-white-en.png";

type Props = { locale: Locale };

export default async function Header({ locale }: Props) {
  const commonT = await getTranslations({ locale, namespace: "Common" });
  const t = await getTranslations({ locale, namespace: "Header" });
  return (
    <div className="sticky top-0 bg-blue-900 text-white">
      <Link href="/" title={commonT("home")}>
        <Image
          src={locale == "ro" ? logoRo : logoEn}
          width={200}
          height={100}
          alt={t("logo")}
        />
      </Link>
      <div className="max-w-7xl flex w-full justify-between gap-5 items-center mx-auto">
        <LocaleSwitcher />
      </div>
    </div>
  );
}
