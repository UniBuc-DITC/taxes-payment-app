import { PrismaClient, Role, StudyCycle, FacultyTaxType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  if (!process.env.EUPLATESC_KEY)
    throw Error("Missing EUPLATESC_KEY env variable");

  const euPlatescAccounts = [];
  for (let i = 1; i <= 25; i++) {
    const account = await prisma.euPlatescAccount.create({
      data: {
        name: `Account ${i}`,
        description: `Description ${i}`,
        merchantId: "44841002813",
        secretKey: process.env.EUPLATESC_KEY,
        didacticPremiumCardOnly: i % 2 === 0, // Alternate between true and false
      },
    });
    euPlatescAccounts.push(account);
  }

  const faculties = [];
  for (let i = 1; i <= 25; i++) {
    const faculty = await prisma.faculty.create({
      data: {
        nameRo: `Faculty ${i} RO`,
        nameEn: `Faculty ${i} EN`,
        euplatescAccountId: euPlatescAccounts[i - 1].id, // Use an existing EuPlatescAccount ID
      },
    });
    faculties.push(faculty);
  }

  const studentDorms = [];
  for (let i = 1; i <= 25; i++) {
    const studentDorm = await prisma.studentDorm.create({
      data: {
        name: `Dormitory ${i}`,
        euplatescAccountId: euPlatescAccounts[i - 1].id, // Use an existing EuPlatescAccount ID
      },
    });
    studentDorms.push(studentDorm);
  }

  const facultyTaxValues = [];
  for (let i = 1; i <= 25; i++) {
    let studyCycle: StudyCycle = StudyCycle.bachelors;
    if (i >= 5 && i < 10) {
      studyCycle = StudyCycle.doctorate;
    } else if (i >= 10 && i < 15) {
      studyCycle = StudyCycle.masters;
    } else if (i >= 15 && i < 20) {
      studyCycle = StudyCycle.bachelors;
    } else {
      studyCycle = StudyCycle.postgraduate;
    }

    const facultyTaxValue = await prisma.facultyTaxValue.create({
      data: {
        value: 1000 * i, // Values are 1000, 2000, 3000, ...
        studyCycle, // Set to a specific study cycle
        facultyId: faculties[i - 1].id, // Use an existing Faculty ID
        facultyTaxType:
          i % 2 === 0 ? FacultyTaxType.admission : FacultyTaxType.tuition, // Alternate between types
        remarksRo: `Remarks RO ${i}`,
        remarksEn: `Remarks EN ${i}`,
      },
    });
    facultyTaxValues.push(facultyTaxValue);
  }

  const studentDormTaxValues = [];
  for (let i = 1; i <= 25; i++) {
    const studentDormTaxValue = await prisma.studentDormTaxValue.create({
      data: {
        value: 500 * i, // Values are 500, 1000, 1500, ...
        studentDormId: studentDorms[i - 1].id, // Use an existing StudentDorm ID
        remarksRo: `Remarks RO ${i}`,
        remarksEn: `Remarks EN ${i}`,
      },
    });
    studentDormTaxValues.push(studentDormTaxValue);
  }

  console.log("Inserted 25 records for each entity.");

  await prisma.$disconnect();
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    process.exit();
  });
