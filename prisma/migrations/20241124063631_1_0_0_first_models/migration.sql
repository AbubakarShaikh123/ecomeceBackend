-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "ProductItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItems" (
    "id" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "totalPrice" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CartItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CartItems_userId_key" ON "CartItems"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_productId_key" ON "Orders"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_userId_key" ON "Orders"("userId");

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
