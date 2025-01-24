import AccommodationTaxForm from "@/components/forms/dorms/AccommodationTaxForm";
import { getDormsWithTax } from "@/db/dorms";
import { createDormTaxOptions } from "@/utils/forms/dorms";
import { getDormFormTexts } from "@/utils/forms/translations";
import { unstable_setRequestLocale } from "next-intl/server";
import { unstable_noStore } from "next/cache";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AccommodationTaxPage(props: Props) {
  const params = await props.params;

  const { locale } = params;

  unstable_noStore();
  unstable_setRequestLocale(locale);
  const [dorms, dormsText] = await Promise.all([
    getDormsWithTax(),
    getDormFormTexts(),
  ]);
  const formTaxesOptions = createDormTaxOptions(dorms, locale);
  return (
    <div>
      <AccommodationTaxForm {...formTaxesOptions} {...dormsText} />
    </div>
  );
}
