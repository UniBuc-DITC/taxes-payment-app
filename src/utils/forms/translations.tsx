import {
  ReCAPTCHATexts,
  RequiredCheckboxTexts,
} from "@/types/forms/agreements";
import { AmountTexts } from "@/types/forms/amount";
import {
  AccommodationTaxesFields,
  DormTaxesTexts,
  AccommodationTaxFormTexts,
  DormRoomNumberTexts,
} from "@/types/forms/dorms";
import {
  AdmissionFormTexts,
  DidacticPremiumCardTexts,
  FacultyTaxesFields,
  FacultyTaxesTexts,
  TuitionFormTexts,
} from "@/types/forms/faculties";
import { MonthOption, MonthSelectTexts } from "@/types/forms/month";
import {
  BillingFormFields,
  BillingFormPatternFields,
  BillingFormTexts,
} from "@/types/forms/billingDetails";
import { SubmitButtonTexts } from "@/types/forms/submitBtn";
import { getTranslations } from "next-intl/server";
import { InputBaseTexts } from "@/types/forms/reusable";

const fullCategory = ["required", "placeholders", "labels"] as const;
const patternKeys = ["numericalCode", "email", "phoneNumber"] as const;
const fullKeys = [
  "firstName",
  "lastName",
  "city",
  "country",
  ...patternKeys,
] as const;

/*
 * This function may be used with a key if we want different keys for each form
 */
export async function getBillingTextsWithoutAddress(): Promise<BillingFormTexts> {
  const t = await getTranslations("Forms.BillingDetails");

  let personalText: BillingFormTexts = {} as BillingFormTexts;
  fullCategory.forEach((c) => {
    if (!personalText[c]) {
      personalText[c] = {} as BillingFormFields;
    }

    fullKeys.forEach((k) => {
      personalText[c][k] = t(`${c}.${k}`);
    });
  });
  patternKeys.forEach((k) => {
    if (!personalText.patterns) {
      personalText.patterns = {} as BillingFormPatternFields;
    }
    personalText.patterns[k] = t(`patterns.${k}`);
  });
  return personalText;
}

const fullKeysWithAddress = [...fullKeys, "address"] as const;

export async function getBillingTexts(): Promise<BillingFormTexts> {
  const t = await getTranslations("Forms.BillingDetails");

  let personalText: BillingFormTexts = {} as BillingFormTexts;
  fullCategory.forEach((c) => {
    if (!personalText[c]) {
      personalText[c] = {} as BillingFormFields;
    }

    fullKeysWithAddress.forEach((k) => {
      personalText[c][k] = t(`${c}.${k}`);
    });
  });
  patternKeys.forEach((k) => {
    if (!personalText.patterns) {
      personalText.patterns = {} as BillingFormPatternFields;
    }
    personalText.patterns[k] = t(`patterns.${k}`);
  });
  return personalText;
}

export async function getConsentTermsText(): Promise<RequiredCheckboxTexts> {
  const t = await getTranslations(`Forms.ConsentTerms`);
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
  const t = await getTranslations(`Forms.ConsentEuPlatesc`);
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

export async function getReCAPTCHAText(): Promise<ReCAPTCHATexts> {
  const t = await getTranslations("Forms.ReCAPTCHA");
  return {
    required: t("required"),
    validate: t("validate"),
  };
}

const monthKeys = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

export async function getMonthOptions(): Promise<MonthOption[]> {
  const t = await getTranslations("Forms.Dorms.MonthTexts.MonthOptions");
  return monthKeys.map((k, i) => ({
    value: (i + 1).toString(),
    label: t(`${k}`),
  }));
}

export async function getMonthsTexts(): Promise<MonthSelectTexts> {
  const t = await getTranslations("Forms.Dorms.MonthTexts");
  return {
    label: t("label"),
    extra: t("extra") || "",
    noMonth: t("noMonth"),
    required: t("required"),
    monthOptions: monthKeys.map((k, i) => ({
      value: (i + 1).toString(),
      label: t(`MonthOptions.${k}`),
    })),
  };
}

export async function getPartialPayTexts(): Promise<InputBaseTexts> {
  const t = await getTranslations("Forms.Dorms.PartialPay");
  return {
    label: t("label"),
  };
}

export async function getDormRoomNumberTexts(): Promise<DormRoomNumberTexts> {
  const t = await getTranslations("Forms.Dorms.RoomNumber");
  return {
    label: t("label"),
    required: t("required"),
    placeholder: t("placeholder"),
    pattern: t("pattern"),
  };
}

const facultyTaxesFields = [
  { field: "facultyId", translation: "faculty" },
  { field: "taxId", translation: "tax" },
] as const;
const facultyTaxesCategory = ["required", "labels"] as const;

export async function getFacultyTaxesTexts(): Promise<FacultyTaxesTexts> {
  const t = await getTranslations("Forms.Faculties.FacultyTaxes");
  let facultyTaxesTexts: FacultyTaxesTexts = {
    extraTaxOptions: {
      faculty: t("extraTaxOptions.faculty"),
      noFacultyTaxes: t("extraTaxOptions.tax"),
      tax: t("extraTaxOptions.noFacultyTaxes"),
    },
  } as FacultyTaxesTexts;

  facultyTaxesCategory.forEach((c) => {
    if (!facultyTaxesTexts[c]) {
      facultyTaxesTexts[c] = {} as FacultyTaxesFields;
    }
    facultyTaxesFields.forEach(({ field, translation }) => {
      facultyTaxesTexts[c][field] = t(`${c}.${translation}`);
    });
  });

  return facultyTaxesTexts;
}

const dormTaxesFields = [
  { field: "dormId", translation: "dorm" },
  { field: "taxId", translation: "tax" },
] as const;
const dormTaxesCategory = ["required", "labels"] as const;

export async function getDormTaxesTexts(): Promise<DormTaxesTexts> {
  const t = await getTranslations("Forms.Dorms.AccommodationTaxesForm");
  let dormTaxesTexts: DormTaxesTexts = {
    extraTaxOptions: {
      dorm: t("extraTaxOptions.dorm"),
      noDormTaxes: t("extraTaxOptions.tax"),
      tax: t("extraTaxOptions.noDormTaxes"),
    },
  } as DormTaxesTexts;

  dormTaxesCategory.forEach((c) => {
    if (!dormTaxesTexts[c]) {
      dormTaxesTexts[c] = {} as AccommodationTaxesFields;
    }
    dormTaxesFields.forEach(({ field, translation }) => {
      dormTaxesTexts[c][field] = t(`${c}.${translation}`);
    });
  });

  return dormTaxesTexts;
}

export async function getAdmissionFormTexts(): Promise<AdmissionFormTexts> {
  const [
    billingTexts,
    facultyTaxesTexts,
    submitTexts,
    agreeTexts,
    acceptEuPlatescTexts,
    recaptchaTexts,
    partialPayTexts,
    variableAmountTexts,
  ] = await Promise.all([
    getBillingTexts(),
    getFacultyTaxesTexts(),
    getSubmitButtonTexts(),
    getConsentTermsText(),
    getEuPlatescText(),
    getReCAPTCHAText(),
    getPartialPayTexts(),
    getAmountFormTexts(),
  ]);
  return {
    billingTexts,
    facultyTaxesTexts,
    submitTexts,
    agreeTexts,
    acceptEuPlatescTexts,
    recaptchaTexts,
    partialPayTexts,
    variableAmountTexts,
  };
}

export async function getTuitionFormTexts(): Promise<TuitionFormTexts> {
  const [admissionTexts, variableAmountTexts, didacticPremiumCardText] =
    await Promise.all([
      getAdmissionFormTexts(),
      getAmountFormTexts(),
      getDidiacticPremiumCardTexts(),
    ]);

  return {
    ...admissionTexts,
    variableAmountTexts,
    didacticPremiumCardText,
  };
}

export async function getDormFormTexts(): Promise<AccommodationTaxFormTexts> {
  const [
    billingTexts,
    dormTaxesTexts,
    monthTexts,
    submitTexts,
    agreeTexts,
    acceptEuPlatescTexts,
    recaptchaTexts,
    variableAmountTexts,
    partialPayTexts,
    dormRoomNumberTexts,
  ] = await Promise.all([
    getBillingTextsWithoutAddress(),
    getDormTaxesTexts(),
    getMonthsTexts(),
    getSubmitButtonTexts(),
    getConsentTermsText(),
    getEuPlatescText(),
    getReCAPTCHAText(),
    getAmountFormTexts(),
    getPartialPayTexts(),
    getDormRoomNumberTexts(),
  ]);
  return {
    billingTexts,
    dormTaxesTexts,
    monthTexts,
    submitTexts,
    agreeTexts,
    acceptEuPlatescTexts,
    recaptchaTexts,
    variableAmountTexts,
    partialPayTexts,
    dormRoomNumberTexts,
  };
}
