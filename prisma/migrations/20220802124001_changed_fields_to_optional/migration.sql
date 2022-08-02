-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CategoryModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" INTEGER,
    CONSTRAINT "CategoryModel_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CategoryModel" ("categoryId", "createdAt", "id", "name", "updatedAt") SELECT "categoryId", "createdAt", "id", "name", "updatedAt" FROM "CategoryModel";
DROP TABLE "CategoryModel";
ALTER TABLE "new_CategoryModel" RENAME TO "CategoryModel";
CREATE TABLE "new_CommentModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rate" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "courseId" INTEGER,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "CommentModel_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "CourseModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "CommentModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CommentModel" ("content", "courseId", "createdAt", "id", "rate", "title", "updatedAt", "userId") SELECT "content", "courseId", "createdAt", "id", "rate", "title", "updatedAt", "userId" FROM "CommentModel";
DROP TABLE "CommentModel";
ALTER TABLE "new_CommentModel" RENAME TO "CommentModel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
