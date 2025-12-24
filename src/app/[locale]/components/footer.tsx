import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import classNames from "classnames";

type Props = {
  locale: Locale;
  className: string;
};

export default async function Footer({ locale, className }: Props) {
  const navigationT = await getTranslations({
    locale,
    namespace: "Common.Navigation",
  });
  const t = await getTranslations({ locale, namespace: "Footer" });
  return (
    <footer
      className={classNames(
        "text-center z-10 bottom-0 bg-blue-900 text-white p-2 flex flex-row flex-wrap gap-x-3 gap-y-2 items-center justify-center",
        className,
      )}
    >
      <Link href="/">{navigationT("home")}</Link>
      <Link href="/guide">{t("guide")}</Link>
      <Link href="/accessibility">{t("accessibility")}</Link>
      <Link href="/data-privacy">{t("dataPrivacy")}</Link>
      <Link href="/contact">{t("contact")}</Link>
    </footer>
  );
}
