import { EuPlatesc } from "euplatesc";
import { EuPlatescAccount } from "@prisma/client";

export type EuPlatescPayment = {
  account: EuPlatescAccount;
  amount: number;
  invoiceId: string;
  description: string;
  billingEmail: string;
  billingPhone: string;
  billingCountry: string;
  billingCity: string;
  billingAddress: string;
};

export type EuPlatescPaymentResponse = {
  account: EuPlatescAccount;
  amount: string;
  currency: string;
  invoiceId: string;
  epId: string;
  action: string;
  message: string;
  approval: string;
  timestamp: string;
  nonce: string;
  fpHash: string;
};

export function generateEuPlatescPaymentUrl(data: EuPlatescPayment): string {
  const euPlatesc = new EuPlatesc({
    merchantId: data.account.merchantId.toString(),
    secretKey: data.account.secretKey,
    testMode: true,
  });

  const url = euPlatesc.paymentUrl({
    amount: data.amount,
    currency: "RON",
    invoiceId: data.invoiceId,
    orderDescription: data.description,

    billingEmail: data.billingEmail,
    billingPhone: data.billingPhone,

    billingCountry: data.billingCountry,
    billingCity: data.billingCity,
    billingAddress: data.billingAddress,

    backToSite: new URL("/", process.env.NEXT_PUBLIC_BASE_URL).toString(),
    backToSiteMethod: "get",

    successUrl: new URL(
      "/api/euplatesc/callback",
      process.env.NEXT_PUBLIC_BASE_URL,
    ).toString(),
    failedUrl: new URL(
      "/api/euplatesc/callback",
      process.env.NEXT_PUBLIC_BASE_URL,
    ).toString(),
  });

  return url.paymentUrl;
}

export function verifyEuPlatescPaymentResponse(
  data: EuPlatescPaymentResponse,
): boolean {
  const euPlatesc = new EuPlatesc({
    merchantId: data.account.merchantId,
    secretKey: data.account.secretKey,
    testMode: true,
  });

  const response = euPlatesc.checkResponse({
    ...data,
    merchantId: data.account.merchantId,
  });

  return response.success;
}
