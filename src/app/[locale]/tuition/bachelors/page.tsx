import TuitionForm from "@/components/forms/faculties/TuitionForm";
import { getFacultiesWithTax } from "@/db/faculties";
import { createFacultyTaxOptions } from "@/utils/forms/faculties";
import { getTuitionFormTexts } from "@/utils/forms/translations";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: { locale: string };
}

export default async function TuitionBachelorsPage({
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);
  const [faculties, tuitionTexts] = await Promise.all([
    getFacultiesWithTax("tuition", "bachelors"),
    getTuitionFormTexts(),
  ]);
  const formTaxesOptions = createFacultyTaxOptions(faculties, locale);
  return (
    <div>
      <TuitionForm {...formTaxesOptions} {...tuitionTexts} />
    </div>
  );
}
