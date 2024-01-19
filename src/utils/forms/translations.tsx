import { RequiredCheckboxTexts } from "@/types/forms/agreements";
import { AmountTexts } from "@/types/forms/amount";
import { DidacticPremiumCardTexts } from "@/types/forms/faculties";
import {
  PersonalFormFields,
  PersonalFormPatternFields,
  PersonalFormTexts,
} from "@/types/forms/personalDetails";
import { SubmitButtonTexts } from "@/types/forms/submitBtn";
import { getTranslations } from "next-intl/server";

const fullCategory = ["required", "placeholders", "labels"] as const;
const patternKeys = ["numericalCode", "email", "phoneNumber"] as const;
const fullKeys = [
  "firstName",
  "lastName",
  "city",
  "country",
  "address",
  ...patternKeys,
] as const;

/*
 * This function may be used with a key if we want different keys for each form
 */
export async function getPersonalTexts(): Promise<PersonalFormTexts> {
  const t = await getTranslations("Forms.PersonalDetails");

  let personalText: PersonalFormTexts = {} as PersonalFormTexts;
  fullCategory.forEach((c) => {
    if (!personalText[c]) {
      personalText[c] = {} as PersonalFormFields;
    }

    fullKeys.forEach((k) => {
      personalText[c][k] = t(`${c}.${k}`);
    });
  });
  patternKeys.forEach((k) => {
    if (!personalText.patterns) {
      personalText.patterns = {} as PersonalFormPatternFields;
    }
    personalText.patterns[k] = t(`patterns.${k}`);
  });
  return personalText;
}

export async function getAgreeTermsText(): Promise<RequiredCheckboxTexts> {
  const t = await getTranslations(`Forms.AgreeTerms`);
  return {
    required: t("required"),
    terms: t.rich("terms", {
      link: (chunks) => (
        <a
          className="underline text-blue-800"
          href="https://unibuc.ro/student-ub/regulamente-si-taxe/"
          target="_blank"
        >
          {chunks}
        </a>
      ),
    }),
  };
}

export async function getEuPlatescText(): Promise<RequiredCheckboxTexts> {
  const t = await getTranslations(`Forms.AcceptEuPlatesc`);
  return {
    required: t("required"),
    terms: t.rich("terms", {
      link: (chunks) => (
        <a
          className="underline text-blue-800"
          href="https://www.euplatesc.ro/"
          target="_blank"
        >
          {chunks}
        </a>
      ),
    }),
  };
}

export async function getSubmitButtonTexts(): Promise<SubmitButtonTexts> {
  const t = await getTranslations("Forms.Btn");
  return {
    text: t("text"),
    loadingText: t("loadingText"),
  };
}

export async function getAmountFormTexts(): Promise<AmountTexts> {
  const t = await getTranslations("Forms.Faculties.Amount");
  console.log(t("required.amount"));
  return {
    required: { amount: t("required.amount") },
    labels: { amount: t("labels.amount") },
    validate: { amount: t("validate.amount") },
  };
}

export async function getDidiacticPremiumCardTexts(): Promise<DidacticPremiumCardTexts> {
  const t = await getTranslations("Forms.Faculties.DidacticPremiumCard");
  return {
    text: t("text"),
  };
}
