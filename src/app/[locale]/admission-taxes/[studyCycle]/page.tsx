import { notFound } from "next/navigation";

import { StudyCycle } from "@prisma/client";

import AdmissionForm from "@/components/forms/faculties/AdmissionTaxForm";
import { getFacultiesWithTax } from "@/db/faculties";
import { createFacultyTaxOptions } from "@/utils/forms/faculties";
import { getAdmissionFormTexts } from "@/utils/forms/translations";

interface Props {
  params: Promise<{ locale: string; studyCycle: StudyCycle }>;
}

export default async function AdmissionTaxPage(props: Props) {
  const { locale, studyCycle } = await props.params;

  if (!Object.values(StudyCycle).includes(studyCycle)) {
    notFound();
  }

  const [faculties, admissionTexts] = await Promise.all([
    getFacultiesWithTax("admission", studyCycle),
    getAdmissionFormTexts(),
  ]);

  const formTaxesOptions = createFacultyTaxOptions(faculties, locale);
  return (
    <div>
      <AdmissionForm {...formTaxesOptions} {...admissionTexts} />
    </div>
  );
}

export function generateStaticParams() {
  // Don't generate this route statically at build time
  return [];
}
