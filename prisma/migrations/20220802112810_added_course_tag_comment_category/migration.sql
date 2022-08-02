-- CreateTable
CREATE TABLE "CategoryModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "CategoryModel_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CourseModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rate" INTEGER NOT NULL DEFAULT 0,
    "price" DECIMAL NOT NULL DEFAULT 0,
    "creditPrice" DECIMAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "TagModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CommentModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rate" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "courseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "CommentModel_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "CourseModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CommentModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CategoryModelToCourseModel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CategoryModelToCourseModel_A_fkey" FOREIGN KEY ("A") REFERENCES "CategoryModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryModelToCourseModel_B_fkey" FOREIGN KEY ("B") REFERENCES "CourseModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CourseModelToTagModel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CourseModelToTagModel_A_fkey" FOREIGN KEY ("A") REFERENCES "CourseModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CourseModelToTagModel_B_fkey" FOREIGN KEY ("B") REFERENCES "TagModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryModelToCourseModel_AB_unique" ON "_CategoryModelToCourseModel"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryModelToCourseModel_B_index" ON "_CategoryModelToCourseModel"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseModelToTagModel_AB_unique" ON "_CourseModelToTagModel"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseModelToTagModel_B_index" ON "_CourseModelToTagModel"("B");
