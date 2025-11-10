import { PrismaClient, Role, StudyCycle, FacultyTaxType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const euPlatescAccounts = [];
  for (let i = 1; i <= 5; i++) {
    const accountName = `Account ${i}`;
    const account = await prisma.euPlatescAccount.upsert({
      where: {
        name: accountName,
      },
      create: {
        name: accountName,
        description: `Description for EuPlatesc account ${i}`,
        merchantId: 10000 + i,
        secretKey: `Key ${i}`,
        didacticPremiumCardOnly: i % 2 === 0, // Alternate between true and false
      },
      update: {},
    });
    euPlatescAccounts.push(account);
  }
  console.log(
    `Ensured ${euPlatescAccounts.length} EuPlatesc accounts exist in the database`,
  );

  const faculties = [];
  for (let i = 1; i <= 10; i++) {
    const nameRo = `Facultatea nr. ${i}`;
    const faculty = await prisma.faculty.upsert({
      where: {
        nameRo,
      },
      create: {
        nameRo,
        nameEn: `Faculty no. ${i}`,
        euplatescAccountId:
          euPlatescAccounts[(i - 1) % euPlatescAccounts.length].id, // Use an existing EuPlatescAccount ID
      },
      update: {},
    });
    faculties.push(faculty);
  }
  console.log(`Ensured ${faculties.length} faculties exist in the database`);

  const studentDorms = [];
  for (let i = 1; i <= 10; i++) {
    const name = `Cămin ${i}`;
    const studentDorm = await prisma.studentDorm.upsert({
      where: {
        name,
      },
      create: {
        name,
        euplatescAccountId:
          euPlatescAccounts[(i - 1) % euPlatescAccounts.length].id, // Use an existing EuPlatescAccount ID
      },
      update: {},
    });
    studentDorms.push(studentDorm);
  }
  console.log(
    `Ensured ${studentDorms.length} student dorms exist in the database`,
  );

  const studyCycles = Object.values(StudyCycle);
  const facultyTaxValues = [];
  for (let facultyIndex = 0; facultyIndex < faculties.length; ++facultyIndex) {
    const faculty = faculties[facultyIndex];
    const facultyId = faculty.id;
    for (
      let studyCycleIndex = 0;
      studyCycleIndex < studyCycles.length;
      ++studyCycleIndex
    ) {
      const studyCycle: StudyCycle = studyCycles[studyCycleIndex];

      for (const facultyTaxType of [
        FacultyTaxType.admission,
        FacultyTaxType.tuition,
      ]) {
        const facultyTaxValue = await prisma.facultyTaxValue.upsert({
          where: {
            facultyTaxIdentifier: {
              studyCycle,
              facultyId,
              facultyTaxType,
            },
          },
          create: {
            value: 2000 + 500 * facultyIndex + 1000 * studyCycleIndex,
            studyCycle,
            facultyId,
            facultyTaxType,
            remarksRo: "Observații pentru taxă",
            remarksEn: "Remarks for tax",
          },
          update: {},
        });
        facultyTaxValues.push(facultyTaxValue);
      }
    }
  }
  console.log(
    `Ensured ${facultyTaxValues.length} faculty tax values exist in the database`,
  );

  const studentDormTaxValues = [];
  for (
    let studentDormIndex = 0;
    studentDormIndex < studentDorms.length;
    ++studentDormIndex
  ) {
    const studentDorm = studentDorms[studentDormIndex];
    const studentDormId = studentDorm.id;

    const studentDormTaxValue = await prisma.studentDormTaxValue.upsert({
      where: {
        studentDormId,
      },
      create: {
        value: 100 * studentDormIndex,
        studentDormId,
        remarksRo: "Observații pentru taxa",
        remarksEn: "Remarks for tax",
      },
      update: {},
    });
    studentDormTaxValues.push(studentDormTaxValue);
  }
  console.log(
    `Ensured ${studentDormTaxValues.length} student dorm tax values exist in the database`,
  );

  await prisma.$disconnect();
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    process.exit();
  });
