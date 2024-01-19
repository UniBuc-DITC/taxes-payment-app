import { SubmitButtonTexts } from "@/types/forms/submitBtnTypes";

interface SubmitButtonProps extends SubmitButtonTexts {
  isSubmitting: boolean;
}

export default function SubmitButton({
  isSubmitting,
  text,
  loadingText,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="mt-4 w-full  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center items-center"
    >
      {isSubmitting ? (
        <>
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0116 0H4z"
            ></path>
          </svg>
          {loadingText}
        </>
      ) : (
        text
      )}
    </button>
  );
}
