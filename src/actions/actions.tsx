"use server";

import prisma from "@/db/prisma";
import {
  dormSchema,
  dormTaxSchema,
  euPlatescAccountSchema,
  facultySchema,
  facultyTaxSchema,
  searchSchema,
} from "@/utils/forms/validationSchemas";
import { FacultyTaxType, Role, StudyCycle } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  AuthProvider,
  AuthProviderCallback,
} from "@microsoft/microsoft-graph-client";
import { Client, Options } from "@microsoft/microsoft-graph-client";
import { getAccessToken } from "@/utils/microsoft-graph";

type InputDorm = z.infer<typeof dormSchema>;
type InputFaculty = z.infer<typeof facultySchema>;
type InputAccount = z.infer<typeof euPlatescAccountSchema>;
type InputTaxDorm = z.infer<typeof dormTaxSchema>;
type InputTaxFaculty = z.infer<typeof facultyTaxSchema>;
type Search = z.infer<typeof searchSchema>;

let accessToken: string | null = null;

export async function createDormitory(data: InputDorm) {
  await prisma.studentDorm.create({
    data: {
      name: data.name,
      euplatescAccountId: data.accountId,
    },
  });
  revalidatePath("/");
  redirect("/admin/dormitories");
}

export async function createFaculty(data: InputFaculty) {
  await prisma.faculty.create({
    data: {
      nameRo: data.nameRo,
      nameEn: data.nameEn,
      euplatescAccountId: data.accountId,
    },
  });
  revalidatePath("/");
  redirect("/admin/faculties");
}

export async function createTaxFaculty(data: InputTaxFaculty) {
  await prisma.facultyTaxValue.create({
    data: {
      value: parseInt(data.value, 10),
      studyCycle:
        data.studyCycle === "bachelors"
          ? StudyCycle.bachelors
          : data.studyCycle === "masters"
            ? StudyCycle.masters
            : data.studyCycle === "doctorate"
              ? StudyCycle.doctorate
              : StudyCycle.postgraduate,
      facultyId: data.facultyId,
      facultyTaxType:
        data.facultyTaxType === "admission"
          ? FacultyTaxType.admission
          : FacultyTaxType.tuition,
      remarksRo: data.remarksRo,
      remarksEn: data.remarksEn,
    },
  });
  revalidatePath("/");
  redirect("/admin/taxes/faculty");
}

export async function createTaxDorm(data: InputTaxDorm) {
  await prisma.studentDormTaxValue.create({
    data: {
      value: parseInt(data.value),
      studentDormId: data.studentDormId,
      remarksRo: data.remarksRo || "",
      remarksEn: data.remarksEn || "",
    },
  });
  revalidatePath("/");
  redirect("/admin/taxes/dormitory");
}

export async function createEuPlatescAccount(data: InputAccount) {
  await prisma.euPlatescAccount.create({
    data: {
      name: data.name,
      description: data.description,
      merchantId: parseInt(data.merchantId, 10),
      secretKey: data.secretKey,
      didacticPremiumCardOnly: false,
    },
  });

  revalidatePath("/");
  redirect("/admin/euplatesc-accounts");
}

export async function deleteDormitory(formData: FormData) {
  const id = parseInt(formData.get("dormitoryId") as string);
  await prisma.studentDorm.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
}

export async function deleteFaculty(formData: FormData) {
  const id = parseInt(formData.get("facultyId") as string);
  await prisma.faculty.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
}

export async function deleteTaxFaculty(formData: FormData) {
  const id = parseInt(formData.get("taxFacultyId") as string);
  await prisma.facultyTaxValue.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
}

export async function deleteTaxDorm(formData: FormData) {
  const id = parseInt(formData.get("taxDormId") as string);
  await prisma.studentDormTaxValue.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
}

export async function deleteEuPlatescAccount(formData: FormData) {
  const id = parseInt(formData.get("accountId") as string);
  await prisma.euPlatescAccount.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
}

export async function updateDormitory(data: InputDorm, id: number) {
  await prisma.studentDorm.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      euplatescAccountId: data.accountId,
    },
  });
  revalidatePath("/");
  redirect("/admin/dormitories");
}

export async function updateFaculty(data: InputFaculty, id: number) {
  await prisma.faculty.update({
    where: {
      id: id,
    },
    data: {
      nameRo: data.nameRo,
      nameEn: data.nameEn,
      euplatescAccountId: data.accountId,
    },
  });
  revalidatePath("/");
  redirect("/admin/faculties");
}

export async function updateTaxFaculty(data: InputTaxFaculty, id: number) {
  await prisma.facultyTaxValue.update({
    where: {
      id: id,
    },
    data: {
      value: parseInt(data.value),
      studyCycle:
        data.studyCycle === "bachelors"
          ? StudyCycle.bachelors
          : data.studyCycle === "masters"
            ? StudyCycle.masters
            : data.studyCycle === "doctorate"
              ? StudyCycle.doctorate
              : StudyCycle.postgraduate,
      facultyId: data.facultyId,
      facultyTaxType:
        data.facultyTaxType === "admission"
          ? FacultyTaxType.admission
          : FacultyTaxType.tuition,
      remarksRo: data.remarksRo,
      remarksEn: data.remarksEn,
    },
  });
  revalidatePath("/");
  redirect("/admin/taxes/faculty");
}

export async function updateTaxDorm(data: InputTaxDorm, id: number) {
  await prisma.studentDormTaxValue.update({
    where: {
      id: id,
    },
    data: {
      value: parseInt(data.value),
      studentDormId: data.studentDormId,
      remarksRo: data.remarksRo,
      remarksEn: data.remarksEn,
    },
  });

  revalidatePath("/");
  redirect("/admin/taxes/dormitory");
}

export async function updateEuPlatescAccount(data: InputAccount, id: number) {
  await prisma.euPlatescAccount.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      description: data.description,
      merchantId: parseInt(data.merchantId, 10),
      secretKey: data.secretKey,
      didacticPremiumCardOnly: false,
    },
  });
  revalidatePath("/");
  redirect("/admin/euplatesc-accounts");
}

export async function setEuPlatescDidacticOnly(id: number, bool: boolean) {
  await prisma.euPlatescAccount.update({
    where: {
      id: id,
    },
    data: {
      didacticPremiumCardOnly: bool,
    },
  });
  revalidatePath("/");
}

export async function filterUsers(data: Search) {
  const authProvider: AuthProvider = async (callback: AuthProviderCallback) => {
    try {
      const accessToken = await getAccessToken();

      callback(null, accessToken);
    } catch (error) {
      console.error(error);
      callback(error, null);
    }
  };
  const options: Options = {
    authProvider,
    fetchOptions: {
      cache: "no-store",
    },
  };
  const client = Client.init(options);

  const filteredUsers = await client
    .api(`/users?$filter=startswith(mail, '${data.search}')`)
    .get();

  return filteredUsers;
}

export async function addAdmin(formData: FormData) {
  await prisma.user.create({
    data: {
      azureAdObjectId: formData.get("userId") as string,
      role: Role.appAdmin,
    },
  });
  revalidatePath("/");
  redirect("/admin/users");
}

export async function deleteAdmin(formData: FormData) {
  const id = formData.get("userId") as string;
  await prisma.user.delete({
    where: {
      azureAdObjectId: id,
    },
  });
  revalidatePath("/");
}
