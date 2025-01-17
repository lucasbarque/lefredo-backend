-- AlterTable
ALTER TABLE "dishes" ADD COLUMN     "portion" TEXT,
ADD COLUMN     "prepTime" INTEGER;

-- AlterTable
ALTER TABLE "sections" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "dish_flavors" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "dishId" TEXT,

    CONSTRAINT "dish_flavors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dish_extras" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "dishId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dish_extras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dish_specs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "dish_specs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dishes_specs_dish" (
    "dishSpecsId" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,

    CONSTRAINT "dishes_specs_dish_pkey" PRIMARY KEY ("dishId","dishSpecsId")
);

-- AddForeignKey
ALTER TABLE "dish_flavors" ADD CONSTRAINT "dish_flavors_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "dishes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dish_extras" ADD CONSTRAINT "dish_extras_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "dishes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dishes_specs_dish" ADD CONSTRAINT "dishes_specs_dish_dishSpecsId_fkey" FOREIGN KEY ("dishSpecsId") REFERENCES "dish_specs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dishes_specs_dish" ADD CONSTRAINT "dishes_specs_dish_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "dishes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
