import { notFound } from "next/navigation";

import { getTranslations } from "next-intl/server";

import PageTitle from "@/components/page-title";
import { FacultyTaxType, StudyCycle } from "@/generated/prisma/client";

import { Locale } from "@/i18n/routing";
import prisma from "@/lib/prisma";

import AdmissionTaxForm from "./components/admission-tax-form";

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
      // The faculty taxes' values are stored in the database as PostgreSQL decimals,
      // and since Next.js doesn't know how to serialize such objects,
      // we have to manually convert them to strings and parse them back on the client component.
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
      <AdmissionTaxForm
        locale={locale}
        studyCycle={studyCycle}
        faculties={faculties}
      />
    </>
  );
}

export function generateStaticParams() {
  // Don't generate this route statically at build time
  return [];
}
