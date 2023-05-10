-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STUDENT', 'STAFF');

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(10) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "firstname" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    "phone_number" VARCHAR(15) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_login" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL,
    "qualification" VARCHAR(40),
    "department_id" VARCHAR(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" VARCHAR(3) NOT NULL,
    "name" VARCHAR(45) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" VARCHAR(10) NOT NULL,
    "submission_date" TIMESTAMP(3) NOT NULL,
    "student_id" VARCHAR(10) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" VARCHAR(10) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "close_date" TIMESTAMP(3) NOT NULL,
    "lecture_id" VARCHAR(10) NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
