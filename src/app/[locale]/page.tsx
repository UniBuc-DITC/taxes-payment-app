import { getTranslations, setRequestLocale } from "next-intl/server";

import { PiStudent } from "react-icons/pi";
import { IoMdBook } from "react-icons/io";
import { MdOutlineHouse } from "react-icons/md";

import { ButtonLink } from "./components/link-button";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Index" });

  return (
    <>
      <h1 className="mt-5 uppercase text-3xl sm:text-center text-blue-900 px-8">
        {t("title")}
      </h1>
      <div className="mt-10 flex flex-col items-center gap-5">
        <ButtonLink
          href="/admission-taxes"
          icon={PiStudent}
          label={t("admissionTaxes")}
        />
        <ButtonLink
          href="/tuition-taxes"
          icon={IoMdBook}
          label={t("tuitionTaxes")}
        />
        <ButtonLink
          href="/accommodation-taxes"
          icon={MdOutlineHouse}
          label={t("accommodationTaxes")}
        />
      </div>
    </>
  );
}
