/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `email` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - You are about to alter the column `firstname` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - You are about to alter the column `lastname` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - You are about to alter the column `phone_number` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `password` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - You are about to alter the column `qualification` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `departmentid` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(3)`.
  - The primary key for the `departments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `departments` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(3)`.
  - You are about to alter the column `name` on the `departments` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_departmentid_fkey";

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "firstname" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "lastname" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "phone_number" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "qualification" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "departmentid" SET DATA TYPE VARCHAR(3),
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "departments" DROP CONSTRAINT "departments_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(3),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(45),
ADD CONSTRAINT "departments_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_departmentid_fkey" FOREIGN KEY ("departmentid") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
