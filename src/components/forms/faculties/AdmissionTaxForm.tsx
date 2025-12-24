"use client";

import { useId, useMemo, useState } from "react";

import Select from "react-select";
import { useTranslations } from "next-intl";

import Decimal from "decimal.js-light";

import { Locale } from "@/i18n/routing";

type Props = {
  locale: Locale;
  faculties: {
    id: number;
    nameRo: string;
    nameEn: string;
    facultyTaxValues: {
      value: string;
    }[];
  }[];
};

const AdmissionTaxForm = ({
  locale,
  faculties,
  // facultyOptions,
  // taxesOptions,
  // agreeTexts,
  // billingTexts,
  // facultyTaxesTexts,
  // submitTexts,
  // acceptEuPlatescTexts,
  // recaptchaTexts,
  // partialPayTexts,
  // variableAmountTexts,
}: Props) => {
  const formsT = useTranslations("Common.Forms");

  const facultySelectInstanceId = useId();

  const facultyOptions = useMemo(
    () =>
      faculties.map((faculty) => ({
        value: faculty.id,
        label: locale == "ro" ? faculty.nameRo : faculty.nameEn,
      })),
    [faculties],
  );

  const [selectedFacultyId, setFacultyId] = useState<number | null>(null);

  const facultyTaxValue = useMemo(() => {
    if (!selectedFacultyId) {
      return null;
    }

    const selectedFaculty = faculties.find(
      (faculty) => faculty.id === selectedFacultyId,
    );
    if (!selectedFaculty) {
      return null;
    }

    if (selectedFaculty.facultyTaxValues.length == 0) {
      return null;
    }

    const facultyTaxValue = selectedFaculty.facultyTaxValues[0];

    return new Decimal(facultyTaxValue.value);
  }, [faculties, selectedFacultyId]);

  return (
    <form className="max-w-prose mx-auto">
      <div className="my-3">
        <label htmlFor="faculty-select" className="block">
          {formsT("faculty")}
        </label>
        <Select
          id="faculty-select"
          instanceId={facultySelectInstanceId}
          options={facultyOptions}
          className="block"
          onChange={(selectedOption) =>
            setFacultyId(selectedOption?.value ?? null)
          }
        />
      </div>
      {selectedFacultyId && (
        <>
          {facultyTaxValue ? (
            <div className="my-3">
              <span>Cuantumul taxei:</span> {facultyTaxValue.toFixed(2)} RON
            </div>
          ) : (
            <p className="my-3">
              Eroare: taxa de admitere nu a fost configurată pentru această
              facultate.
            </p>
          )}
        </>
      )}
    </form>
  );

  /* <AdmissionForm {...formTaxesOptions} {...admissionTexts} /> */

  // const {
  //   handleSubmit,
  //   watch,
  //   setValue,
  //   control,
  //   register,
  //   formState: { errors, isSubmitting },
  // } = useForm<AdmissionTaxFormData>({
  //   defaultValues: {
  //     firstName: "",
  //     lastName: "",
  //     city: "",
  //     numericalCode: "",
  //     country: "",
  //     address: "",
  //     email: "",
  //     phoneNumber: "",
  //     consentToTerms: false,
  //     facultyId: "",
  //     taxId: "",
  //     amount: 0,
  //     consentEuPlatesc: false,
  //     recaptcha: "",
  //     partialPay: false,
  //   },
  // });
  // const partialPayValue = watch("partialPay");
  // const onSubmit: SubmitHandler<AdmissionTaxFormData> = useCallback(
  //   async (data) => {
  //     const r = await submitAdmissionTaxForm(data);
  //     console.log(r);
  //   },
  //   [],
  // );
  // const [selectedFacultyTaxOption, setSelectedFacultyTaxOption, disabled] =
  //   useParentTaxOptions<FacultyTaxOption, AdmissionTaxFormData>({
  //     watch,
  //     entityId: "facultyId",
  //     setValue,
  //   });
  // return (
  //   <form
  //     onSubmit={handleSubmit(onSubmit)}
  //     className="max-w-5xl mx-auto mt-12 bg-white p-10 shadow-lg rounded-lg space-y-6"
  //   >
  //     <div className="md:grid md:grid-cols-2 gap-6 flex flex-col items-center justify-center">
  //       <FacultyTaxesForm
  //         facultyOptions={facultyOptions}
  //         taxesOptions={taxesOptions}
  //         {...facultyTaxesTexts}
  //         control={control}
  //         watch={watch}
  //         setValue={setValue}
  //         setTaxesOptionParent={setSelectedFacultyTaxOption}
  //         partialPay={partialPayValue}
  //       />
  //       <PartialPayForm
  //         register={register}
  //         {...partialPayTexts}
  //         disabled={disabled}
  //       />
  //       {partialPayValue && (
  //         <AmountForm
  //           control={control}
  //           {...variableAmountTexts}
  //           selectedEntityTaxOption={selectedFacultyTaxOption}
  //           errors={errors}
  //         />
  //       )}
  //       <BillingDetailsForm
  //         {...billingTexts}
  //         errors={errors}
  //         register={register}
  //         disabled={disabled}
  //         renderAddress={true}
  //       />
  //       <ConsentToTermsForm
  //         {...agreeTexts}
  //         errors={errors}
  //         register={register}
  //         disabled={disabled}
  //       />
  //       <EuPlatescConsentForm
  //         {...acceptEuPlatescTexts}
  //         errors={errors}
  //         register={register}
  //         disabled={disabled}
  //       />
  //       <ReCAPTCHAForm
  //         {...recaptchaTexts}
  //         control={control}
  //         errors={errors}
  //         disabled={disabled}
  //       />
  //       <div className="col-span-2 w-full text-center flex items-center justify-center">
  //         <SubmitButton
  //           isSubmitting={isSubmitting}
  //           {...submitTexts}
  //           disabled={disabled}
  //         />
  //       </div>
  //     </div>
  //   </form>
  // );
};

export default AdmissionTaxForm;
