import {
  ReCAPTCHATexts,
  RequiredCheckboxTexts,
} from "@/types/forms/agreements";
import { AmountTexts } from "@/types/forms/amount";
import {
  DormTaxesFields,
  DormTaxesTexts,
  DormsFormTexts,
} from "@/types/forms/dorms";
import {
  AdmissionFormTexts,
  DidacticPremiumCardTexts,
  FacultyTaxesFields,
  FacultyTaxesTexts,
  TuitionFormTexts,
} from "@/types/forms/faculties";
import { MonthOption, MonthTexts } from "@/types/forms/month";
import {
  BillingFormFields,
  BillingFormPatternFields,
  BillingFormTexts,
} from "@/types/forms/billingDetails";
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
export async function getBillingTexts(): Promise<BillingFormTexts> {
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

const monthKeys = [
  "month_january",
  "month_february",
  "month_march",
  "month_april",
  "month_may",
  "month_june",
  "month_july",
  "month_august",
  "month_september",
  "month_october",
  "month_november",
  "month_december",
] as const;

export async function getReCAPTCHAText(): Promise<ReCAPTCHATexts> {
  const t = await getTranslations("Forms.ReCAPTCHA");
  return {
    required: t("required"),
    validate: t("validate"),
  };
}

export async function getMonthOptions(): Promise<MonthOption[]> {
  const t = await getTranslations("Forms.Dorms.MonthOptions");
  return monthKeys.map((k) => ({
    id: parseInt(t(`${k}.id`)),
    label: t(`${k}.label`),
  }));
}

export async function getMonthsTexts(): Promise<MonthTexts> {
  const t = await getTranslations("Forms.Dorms.MonthTexts");
  return {
    label: t("label"),
    extra: t("extra") || "",
    noMonth: t("noMonth"),
    required: t("required"),
    monthOptions: monthKeys.map((k) => ({
      id: parseInt(t(`MonthOptions.${k}.id`)),
      label: t(`MonthOptions.${k}.label`),
    })),
  };
}

const facultyTaxesFields = ["faculty", "tax"] as const;
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
    facultyTaxesFields.forEach((k) => {
      facultyTaxesTexts[c][k] = t(`${c}.${k}`);
    });
  });

  return facultyTaxesTexts;
}

const dormTaxesFields = ["dorm", "tax"] as const;
const dormTaxesCategory = ["required", "labels"] as const;

export async function getDormTaxesTexts(): Promise<DormTaxesTexts> {
  const t = await getTranslations("Forms.Dorms.DromsTaxes");
  let dormTaxesTexts: DormTaxesTexts = {
    extraTaxOptions: {
      dorm: t("extraTaxOptions.dorm"),
      noDormTaxes: t("extraTaxOptions.tax"),
      tax: t("extraTaxOptions.noDormTaxes"),
    },
  } as DormTaxesTexts;

  dormTaxesCategory.forEach((c) => {
    if (!dormTaxesTexts[c]) {
      dormTaxesTexts[c] = {} as DormTaxesFields;
    }
    dormTaxesFields.forEach((k) => {
      dormTaxesTexts[c][k] = t(`${c}.${k}`);
    });
  });

  return dormTaxesTexts;
}

export async function getAdmissionFormTexts(): Promise<AdmissionFormTexts> {
  const [
    personalTexts,
    facultyTaxesTexts,
    submitTexts,
    agreeTexts,
    acceptEuPlatescTexts,
    recaptchaTexts,
  ] = await Promise.all([
    getBillingTexts(),
    getFacultyTaxesTexts(),
    getSubmitButtonTexts(),
    getConsentTermsText(),
    getEuPlatescText(),
    getReCAPTCHAText(),
  ]);
  return {
    billingTexts: personalTexts,
    facultyTaxesTexts,
    submitTexts,
    agreeTexts,
    acceptEuPlatescTexts,
    recaptchaTexts,
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

export async function getDormFormTexts(): Promise<DormsFormTexts> {
  const [
    personalTexts,
    dormTaxesTexts,
    monthTexts,
    submitTexts,
    agreeTexts,
    acceptEuPlatescTexts,
    recaptchaTexts,
  ] = await Promise.all([
    getBillingTexts(),
    getDormTaxesTexts(),
    getMonthsTexts(),
    getSubmitButtonTexts(),
    getConsentTermsText(),
    getEuPlatescText(),
    getReCAPTCHAText(),
  ]);
  return {
    billingTexts: personalTexts,
    dormTaxesTexts,
    monthTexts,
    submitTexts,
    agreeTexts,
    acceptEuPlatescTexts,
    recaptchaTexts,
  };
}
