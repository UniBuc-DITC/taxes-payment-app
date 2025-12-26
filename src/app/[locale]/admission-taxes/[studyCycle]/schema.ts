import { z } from "zod";
import { zfd } from "zod-form-data";

import { StudyCycle } from "@/generated/prisma/enums";

export const inputSchema = zfd.formData({
  studyCycle: zfd.text(z.enum(Object.values(StudyCycle))),
  facultyId: zfd.numeric(z.number().int().positive()),
  partialPayment: zfd.checkbox(),
  partialPaymentValue: zfd.numeric(z.number().positive().gte(100).optional()),
  didacticCardPayment: zfd.checkbox(),
});

export type InitiateAdmissionTaxPaymentInputSchema = z.infer<
  typeof inputSchema
>;
