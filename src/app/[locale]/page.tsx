import { getTranslations, setRequestLocale } from "next-intl/server";

import { IconType } from "react-icons/lib";
import { MdKeyboardArrowRight } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { IoMdBook } from "react-icons/io";
import { MdOutlineHouse } from "react-icons/md";

import { Link } from "@/i18n/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Index" });

  return (
    <main>
      <h1 className="mt-5 uppercase text-3xl sm:text-center text-blue-900 px-8">
        {t("title")}
      </h1>
      <div className="mt-10 flex flex-col items-center gap-5">
        <TaxCategoryLink
          href="/admission-taxes"
          icon={PiStudent}
          label={t("admissionTaxes")}
        />
        <TaxCategoryLink
          href="/tuition-taxes"
          icon={IoMdBook}
          label={t("tuitionTaxes")}
        />
        <TaxCategoryLink
          href="/accommodation-taxes"
          icon={MdOutlineHouse}
          label={t("accommodationTaxes")}
        />
      </div>
    </main>
  );
}

type Props = {
  href: string;
  icon: IconType;
  label: string;
};

function TaxCategoryLink({ href, icon: Icon, label }: Props) {
  return (
    <Link
      href={href}
      className="py-1 flex flex-row items-center bg-blue-300 text-blue-900 border-2 border-blue-900 rounded-2xl"
    >
      <span className="p-3 mr-5 relative right-3 bg-lime-400 text-blue-900 border-2 border-blue-900 rounded-2xl">
        <Icon size={32} />
      </span>
      <span>{label}</span>
      <span className="mx-3">
        <MdKeyboardArrowRight />
      </span>
    </Link>
  );
}
