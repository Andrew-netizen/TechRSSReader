ALTER TABLE [KeywordToExclude] DROP CONSTRAINT [FK_KeywordToExclude_Blogs_BlogId];

GO

ALTER TABLE [KeywordToInclude] DROP CONSTRAINT [FK_KeywordToInclude_Blogs_BlogId];

GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[RssFeedItems]') AND [c].[name] = N'Categories');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [RssFeedItems] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [RssFeedItems] ALTER COLUMN [Categories] nvarchar(500) NULL;

GO

ALTER TABLE [RssFeedItems] ADD [UserRating] int NULL;

GO

ALTER TABLE [RssFeedItems] ADD [UserRatingPrediction] real NULL;

GO

ALTER TABLE [KeywordToExclude] ADD CONSTRAINT [FK_KeywordToExclude_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([Id]) ON DELETE CASCADE;

GO

ALTER TABLE [KeywordToInclude] ADD CONSTRAINT [FK_KeywordToInclude_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([Id]) ON DELETE CASCADE;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200917005740_AddUserRating', N'3.0.0');

GO

