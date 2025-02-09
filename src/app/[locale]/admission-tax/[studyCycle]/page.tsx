import AdmissionForm from "@/components/forms/faculties/AdmissionTaxForm";
import { getFacultiesWithTax } from "@/db/faculties";
import { createFacultyTaxOptions } from "@/utils/forms/faculties";
import { getAdmissionFormTexts } from "@/utils/forms/translations";
import { StudyCycle } from "@prisma/client";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { unstable_noStore } from "next/cache";

export function generateStaticParams() {
  return Object.values(StudyCycle).map((cycle) => ({ studyCycle: cycle }));
}

interface Props {
  params: Promise<{ locale: string; studyCycle: StudyCycle }>;
}

export default async function AdmissionTaxPage(props: Props) {
  const params = await props.params;

  const { locale, studyCycle } = params;

  unstable_noStore();
  unstable_setRequestLocale(locale);
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
