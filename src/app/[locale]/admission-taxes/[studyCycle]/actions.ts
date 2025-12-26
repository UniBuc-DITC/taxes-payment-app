"use server";

import { createHmac, randomBytes } from "node:crypto";
import { redirect, RedirectType } from "next/navigation";

import { actionClient } from "@/lib/safe-action";

import { inputSchema } from "./schema";
import prisma from "@/lib/prisma";

const EUPLATESC_REDIRECT_URL =
  "https://secure.euplatesc.ro/tdsprocess/tranzactd.php";

const HASHING_ALGORITHM = "sha256";

export const initiateAdmissionTaxPaymentAction = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput }) => {
    console.log("Entered initiateAdmissionTaxPayment action code");

    const faculty = await prisma.faculty.findUnique({
      where: { id: parsedInput.facultyId },
      include: {
        euPlatescAccount: true,
        facultyTaxValues: { where: { studyCycle: parsedInput.studyCycle } },
      },
    });

    if (!faculty) {
      throw new Error("Faculty not found");
    }

    const euPlatescAccount = faculty.euPlatescAccount;
    if (!euPlatescAccount) {
      throw new Error(
        "EuPlătesc account not configured for the selected faculty",
      );
    }

    const facultyTaxValue = faculty.facultyTaxValues[0];
    if (!facultyTaxValue) {
      throw new Error(
        "Faculty tax value not found for the selected study cycle",
      );
    }

    const time = new Date();
    const timestamp = `${time.getUTCFullYear()}${time.getUTCMonth() + 1}${time.getUTCDate()}${time.getUTCHours()}${time.getUTCMinutes()}${time.getUTCSeconds()}`;
    const nonce = randomBytes(16).toString("hex");

    const hashedParameters = {
      amount: (
        parsedInput.partialPaymentValue ?? facultyTaxValue.value
      ).toFixed(2),
      curr: facultyTaxValue.currency.toUpperCase(),
      // TODO
      invoice_id: "123",
      // TODO
      order_desc: `Plată taxă de admitere ${faculty.nameRo}`,
      merch_id: euPlatescAccount.merchantId.toString(),
      timestamp,
      nonce,
    };

    let hashInput = "";
    Object.values(hashedParameters).forEach((element) => {
      const byteLength = Buffer.byteLength(element, "utf-8");
      if (byteLength > 0) {
        hashInput = `${hashInput}${byteLength}${element}`;
      } else {
        hashInput = hashInput.concat("-");
      }
    });

    const keyBuffer = Buffer.from(euPlatescAccount.secretKey, "hex");
    const parametersHash = createHmac(HASHING_ALGORITHM, keyBuffer)
      .update(hashInput)
      .digest("hex");

    const redirectTargetUrl = new URL(EUPLATESC_REDIRECT_URL);
    Object.entries(hashedParameters).forEach(([key, value]) => {
      redirectTargetUrl.searchParams.append(key, value);
    });
    redirectTargetUrl.searchParams.append("fp_hash", parametersHash);

    redirect(redirectTargetUrl.toString(), RedirectType.push);

    return { success: "OK" };
  });
