import { notFound } from "next/navigation";

import { getTranslations } from "next-intl/server";

import PageTitle from "@/components/page-title";
import { FacultyTaxType, StudyCycle } from "@/generated/prisma/client";

import { Locale } from "@/i18n/routing";
import prisma from "@/lib/prisma";

import AdmissionTaxForm from "@/components/forms/faculties/AdmissionTaxForm";

type Props = {
  params: Promise<{ locale: Locale; studyCycle: StudyCycle }>;
};

export default async function AdmissionTaxPage(props: Props) {
  const { locale, studyCycle } = await props.params;

  // Validate study cycle route parameter
  if (!Object.values(StudyCycle).includes(studyCycle)) {
    notFound();
  }

  // Query the list of faculties (including their associated taxes)
  const rawFaculties = await prisma.faculty.findMany({
    include: {
      facultyTaxValues: {
        where: { studyCycle, facultyTaxType: FacultyTaxType.admission },
      },
    },
    where: { euPlatescAccount: { isNot: null } },
  });
  const faculties = rawFaculties.map((faculty) => ({
    ...faculty,
    facultyTaxValues: faculty.facultyTaxValues.map((ftv) => ({
      ...ftv,
      value: ftv.value.toString(),
    })),
  }));

  const t = await getTranslations("AdmissionTaxes");
  const studyCyclesT = await getTranslations("Common.StudyCycles");

  return (
    <>
      <PageTitle
        title={t("paymentFormPageTitle", {
          studyCycle: studyCyclesT(studyCycle).toLocaleLowerCase(),
        })}
      />
      <AdmissionTaxForm locale={locale} faculties={faculties} />
    </>
  );
}

export function generateStaticParams() {
  // Don't generate this route statically at build time
  return [];
}
