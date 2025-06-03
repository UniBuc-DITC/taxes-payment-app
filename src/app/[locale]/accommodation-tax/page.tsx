import AccommodationTaxForm from "@/components/forms/dorms/AccommodationTaxForm";
import { getDormsWithTax } from "@/db/dorms";
import { createDormTaxOptions } from "@/utils/forms/dorms";
import { getDormFormTexts } from "@/utils/forms/translations";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AccommodationTaxPage(props: Props) {
  const params = await props.params;

  const { locale } = params;

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

export function generateStaticParams() {
  // Don't generate this route statically at build time
  return [];
}
