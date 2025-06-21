import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

type Props = {
  locale: Locale;
};

export default async function Footer({ locale }: Props) {
  const navigationT = await getTranslations({
    locale,
    namespace: "Common.Navigation",
  });
  const t = await getTranslations({ locale, namespace: "Footer" });
  return (
    <footer className="fixed bottom-0 bg-blue-900 text-white p-2 flex flex-row flex-wrap gap-x-3 gap-y-2 items-center justify-center">
      <Link href="/">{navigationT("home")}</Link>
      <Link href="/guide">{t("guide")}</Link>
      <Link href="/accessibility">{t("accessibility")}</Link>
      <Link href="/data-privacy">{t("dataPrivacy")}</Link>
      <Link href="/contact">{t("contact")}</Link>
    </footer>
  );
}
