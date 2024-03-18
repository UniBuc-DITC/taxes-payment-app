import { ReCAPTCHAResponse } from "@/types/forms/agreements";

export async function validateReCAPTCHA(token: string): Promise<boolean> {
  try {
    console.log("validating");
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SERVER}&response=${token}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        method: "POST",
      },
    );
    const res: ReCAPTCHAResponse = await response.json();
    // make more actions, if its necessary
    console.log(res);
    return res.success;
  } catch (error) {
    console.log(error);
    return false;
  }
}
