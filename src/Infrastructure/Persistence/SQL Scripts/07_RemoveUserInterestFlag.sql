ALTER TABLE [KeywordToExclude] DROP CONSTRAINT [FK_KeywordToExclude_Blogs_BlogId];

GO

ALTER TABLE [KeywordToInclude] DROP CONSTRAINT [FK_KeywordToInclude_Blogs_BlogId];

GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[RssFeedItems]') AND [c].[name] = N'UserInterestPrediction');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [RssFeedItems] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [RssFeedItems] DROP COLUMN [UserInterestPrediction];

GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[RssFeedItems]') AND [c].[name] = N'UserInterested');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [RssFeedItems] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [RssFeedItems] DROP COLUMN [UserInterested];

GO

ALTER TABLE [KeywordToExclude] ADD CONSTRAINT [FK_KeywordToExclude_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([Id]) ON DELETE CASCADE;

GO

ALTER TABLE [KeywordToInclude] ADD CONSTRAINT [FK_KeywordToInclude_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([Id]) ON DELETE CASCADE;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200918081108_RemoveUserInterestFlag', N'3.0.0');

GO

