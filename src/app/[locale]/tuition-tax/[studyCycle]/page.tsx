import TuitionForm from "@/components/forms/faculties/TuitionTaxForm";
import { getFacultiesWithTax } from "@/db/faculties";
import { createFacultyTaxOptions } from "@/utils/forms/faculties";
import { getTuitionFormTexts } from "@/utils/forms/translations";
import { StudyCycle } from "@prisma/client";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { unstable_noStore } from "next/cache";

export function generateStaticParams() {
  return Object.values(StudyCycle).map((studyCycle) => ({ studyCycle }));
}

interface Props {
  params: { locale: string; studyCycle: StudyCycle };
}

export default async function TuitionTaxPage({
  params: { locale, studyCycle },
}: Props) {
  unstable_noStore();
  unstable_setRequestLocale(locale);

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
