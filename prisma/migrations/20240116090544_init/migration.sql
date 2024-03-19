-- CreateEnum
CREATE TYPE "Role" AS ENUM ('app_admin', 'taxes_admin');

-- CreateEnum
CREATE TYPE "StudyCycle" AS ENUM ('bachelors', 'masters', 'doctorate', 'postuniversitary');

-- CreateEnum
CREATE TYPE "FacultyTaxType" AS ENUM ('admission', 'tuition');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "azure_ad_object_id" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "euplatesc_accounts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "merchant_id" INTEGER NOT NULL,
    "secret_key" TEXT NOT NULL,
    "didactic_premium_card_only" BOOLEAN NOT NULL,

    CONSTRAINT "euplatesc_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faculties" (
    "id" SERIAL NOT NULL,
    "name_ro" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "euplatesc_account_id" INTEGER,

    CONSTRAINT "faculties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_dorms" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "euplatesc_account_id" INTEGER,

    CONSTRAINT "student_dorms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faculty_tax_values" (
    "id" SERIAL NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "study_cycle" "StudyCycle" NOT NULL,
    "faculty_id" INTEGER NOT NULL,
    "faculty_tax_type" "FacultyTaxType" NOT NULL,
    "remarks_ro" TEXT,
    "remarks_en" TEXT,

    CONSTRAINT "faculty_tax_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_dorm_tax_values" (
    "id" SERIAL NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "student_dorm_id" INTEGER NOT NULL,
    "remarks_ro" TEXT NOT NULL,
    "remarks_en" TEXT NOT NULL,

    CONSTRAINT "student_dorm_tax_values_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_azure_ad_object_id_key" ON "users"("azure_ad_object_id");

-- CreateIndex
CREATE UNIQUE INDEX "euplatesc_accounts_merchant_id_key" ON "euplatesc_accounts"("merchant_id");

-- AddForeignKey
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_euplatesc_account_id_fkey" FOREIGN KEY ("euplatesc_account_id") REFERENCES "euplatesc_accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_dorms" ADD CONSTRAINT "student_dorms_euplatesc_account_id_fkey" FOREIGN KEY ("euplatesc_account_id") REFERENCES "euplatesc_accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculty_tax_values" ADD CONSTRAINT "faculty_tax_values_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_dorm_tax_values" ADD CONSTRAINT "student_dorm_tax_values_student_dorm_id_fkey" FOREIGN KEY ("student_dorm_id") REFERENCES "student_dorms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
