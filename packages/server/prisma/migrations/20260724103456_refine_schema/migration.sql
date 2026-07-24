/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Summary` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Review] DROP CONSTRAINT [Review_productId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Summary] DROP CONSTRAINT [Summary_productId_fkey];

-- DropTable
DROP TABLE [dbo].[Product];

-- DropTable
DROP TABLE [dbo].[Review];

-- DropTable
DROP TABLE [dbo].[Summary];

-- CreateTable
CREATE TABLE [dbo].[products] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(255) NOT NULL,
    [description] VARCHAR(1000),
    [price] FLOAT(53) NOT NULL,
    CONSTRAINT [products_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[reviews] (
    [id] INT NOT NULL IDENTITY(1,1),
    [author] VARCHAR(255) NOT NULL,
    [rating] TINYINT NOT NULL,
    [content] TEXT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [reviews_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [productId] INT NOT NULL,
    CONSTRAINT [reviews_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[summaries] (
    [id] INT NOT NULL IDENTITY(1,1),
    [content] TEXT NOT NULL,
    [generatedAt] DATETIME2 NOT NULL CONSTRAINT [summaries_generatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [expiresAt] DATETIME2 NOT NULL,
    [productId] INT NOT NULL,
    CONSTRAINT [summaries_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [summaries_productId_key] UNIQUE NONCLUSTERED ([productId])
);

-- AddForeignKey
ALTER TABLE [dbo].[reviews] ADD CONSTRAINT [reviews_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[products]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[summaries] ADD CONSTRAINT [summaries_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[products]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
