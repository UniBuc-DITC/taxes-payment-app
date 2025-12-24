import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PiStudent } from "react-icons/pi";
import { IoMdBook } from "react-icons/io";
import { MdOutlineHouse } from "react-icons/md";

import { ButtonLink } from "./components/link-button";

import Ellipse1 from "./images/ellipse-1.svg";
import Ellipse2 from "./images/ellipse-2.svg";

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
      <div className="fixed top-0 w-full h-full -z-10">
        <Image
          src={Ellipse1}
          alt=""
          width="832"
          height="455"
          className="absolute -top-10 -mb-5 w-full h-[120%]"
        />
        <Image
          src={Ellipse2}
          alt=""
          width="832"
          height="455"
          className="absolute -top-10 -mb-5 left-5 w-full h-[120%]"
        />
      </div>
      <div className="top-0 z-0">
        <h1 className="mt-5 uppercase text-3xl font-bold tracking-widest sm:text-center text-blue-900 px-8">
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
      </div>
    </>
  );
}
