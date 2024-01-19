import {
  PersonalFormFields,
  PersonalFormPatternFields,
  PersonalFormTexts,
} from "@/types/forms/personalDetails";
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
