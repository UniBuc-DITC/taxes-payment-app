import AdmissionForm from "@/components/forms/faculties/AdmissionForm";
import { getFacultiesWithTax } from "@/db/faculties";
import { createFacultyTaxOptions } from "@/utils/forms/faculties";
import { getAdmissionFormTexts } from "@/utils/forms/translations";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: { locale: string };
}

export default async function AdmissionDoctoratePage({
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);
  const [faculties, admissionTexts] = await Promise.all([
    getFacultiesWithTax("admission", "doctorate"),
    getAdmissionFormTexts(),
  ]);
  const formTaxesOptions = createFacultyTaxOptions(faculties, locale);
  return (
    <div>
      <AdmissionForm {...formTaxesOptions} {...admissionTexts} />
    </div>
  );
}
