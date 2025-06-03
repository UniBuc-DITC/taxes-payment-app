import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

type Props = {
  locale: Locale;
};

export default async function Footer({ locale }: Props) {
  const commonT = await getTranslations({ locale, namespace: "Common" });
  const t = await getTranslations({ locale, namespace: "Footer" });
  return (
    <footer className="fixed bottom-0 bg-blue-900 text-white">
      <Link href="/">{commonT("home")}</Link>
      <Link href="/guide">{t("guide")}</Link>
      <Link href="/accessibility">{t("accessibility")}</Link>
      <Link href="/data-privacy">{t("dataPrivacy")}</Link>
      <Link href="/contact">{t("contact")}</Link>
    </footer>
  );
}
