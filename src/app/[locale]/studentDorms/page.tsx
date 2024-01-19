import DormsForm from "@/components/forms/dorms/DormsForm";
import { getDormsWithTax } from "@/db/dorms";
import { createDormTaxOptions } from "@/utils/forms/dorms";
import { getDormFormTexts } from "@/utils/forms/translations";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: { locale: string };
}

export default async function StudentDormsPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const [dorms, dromsText] = await Promise.all([
    getDormsWithTax(),
    getDormFormTexts(),
  ]);
  const formTaxesOptions = createDormTaxOptions(dorms, locale);
  return (
    <div>
      <DormsForm {...formTaxesOptions} {...dromsText} />
    </div>
  );
}
