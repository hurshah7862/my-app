BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Product] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [price] FLOAT(53) NOT NULL,
    CONSTRAINT [Product_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Review] (
    [id] INT NOT NULL IDENTITY(1,1),
    [author] NVARCHAR(1000) NOT NULL,
    [rating] INT NOT NULL,
    [content] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Review_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [productId] INT NOT NULL,
    CONSTRAINT [Review_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Summary] (
    [id] INT NOT NULL IDENTITY(1,1),
    [content] NVARCHAR(1000) NOT NULL,
    [generatedAt] DATETIME2 NOT NULL CONSTRAINT [Summary_generatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [expiresAt] DATETIME2 NOT NULL,
    [productId] INT NOT NULL,
    CONSTRAINT [Summary_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Summary_productId_key] UNIQUE NONCLUSTERED ([productId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Review] ADD CONSTRAINT [Review_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[Product]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Summary] ADD CONSTRAINT [Summary_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[Product]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
