import { notFound } from "next/navigation";

import { StudyCycle } from "@prisma/client";

import TuitionForm from "@/components/forms/faculties/TuitionTaxForm";
import { getFacultiesWithTax } from "@/db/faculties";
import { createFacultyTaxOptions } from "@/utils/forms/faculties";
import { getTuitionFormTexts } from "@/utils/forms/translations";

interface Props {
  params: Promise<{ locale: string; studyCycle: StudyCycle }>;
}

export default async function TuitionTaxPage(props: Props) {
  const params = await props.params;

  const { locale, studyCycle } = params;

  if (!Object.values(StudyCycle).includes(studyCycle)) {
    notFound();
  }

  const [faculties, tuitionTexts] = await Promise.all([
    getFacultiesWithTax("tuition", studyCycle),
    getTuitionFormTexts(),
  ]);
  const formTaxesOptions = createFacultyTaxOptions(faculties, locale);
  return (
    <div>
      <TuitionForm {...formTaxesOptions} {...tuitionTexts} />
    </div>
  );
}

export function generateStaticParams() {
  // Don't generate this route statically at build time
  return [];
}
