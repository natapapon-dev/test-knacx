-- CreateTable
CREATE TABLE "PatienRecord" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "prefix" TEXT,
    "first_name" TEXT,
    "middle_name" TEXT,
    "last_name" TEXT,
    "national_id" TEXT,
    "gender" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "occupation" TEXT,
    "race" TEXT,
    "national" TEXT,
    "religion" TEXT,
    "blood_type" TEXT,
    "rh" TEXT,
    "nickname" TEXT,
    "allergic" TEXT,
    "hn" TEXT,
    "foreign_id" TEXT,

    CONSTRAINT "PatienRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatienAddress" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "address" TEXT,
    "province" TEXT,
    "sub_district" TEXT,
    "district" TEXT,
    "country" TEXT,
    "postcode" TEXT,

    CONSTRAINT "PatienAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PatienRecord_national_id_key" ON "PatienRecord"("national_id");

-- CreateIndex
CREATE UNIQUE INDEX "PatienRecord_hn_key" ON "PatienRecord"("hn");

-- CreateIndex
CREATE UNIQUE INDEX "PatienRecord_foreign_id_key" ON "PatienRecord"("foreign_id");

-- AddForeignKey
ALTER TABLE "PatienAddress" ADD CONSTRAINT "PatienAddress_id_fkey" FOREIGN KEY ("id") REFERENCES "PatienRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
