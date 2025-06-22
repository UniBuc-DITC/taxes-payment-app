import { getTranslations, setRequestLocale } from "next-intl/server";

import { PiStudent } from "react-icons/pi";
import { StudyCycle } from "@prisma/client";

import { ButtonLink } from "../components/link-button";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "AdmissionTaxes" });
  const studyCyclesT = await getTranslations({
    locale,
    namespace: "Common.StudyCycles",
  });

  return (
    <>
      <h1 className="mt-5 text-3xl sm:text-center text-blue-900 px-8">
        {t("title")}
      </h1>
      <div className="mt-10 flex flex-col items-center gap-5">
        {Object.values(StudyCycle).map((studyCycle) => (
          <ButtonLink
            key={studyCycle}
            href={`/admission-taxes/${studyCycle}`}
            icon={PiStudent}
            label={studyCyclesT(studyCycle)}
          />
        ))}
      </div>
    </>
  );
}
