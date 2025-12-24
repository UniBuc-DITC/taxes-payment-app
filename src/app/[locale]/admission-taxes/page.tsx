import { getTranslations } from "next-intl/server";

import { PiStudent } from "react-icons/pi";

import PageTitle from "@/components/page-title";
import { StudyCycle } from "@/generated/prisma/client";

import { ButtonLink } from "../components/link-button";

export default async function AdmissionTaxesPage() {
  const t = await getTranslations("AdmissionTaxes");
  const studyCyclesT = await getTranslations("Common.StudyCycles");

  return (
    <>
      <PageTitle title={t("title")} />
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
