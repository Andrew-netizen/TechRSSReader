ALTER TABLE [KeywordToExclude] DROP CONSTRAINT [FK_KeywordToExclude_Blogs_BlogId];

GO

ALTER TABLE [KeywordToInclude] DROP CONSTRAINT [FK_KeywordToInclude_Blogs_BlogId];

GO

ALTER TABLE [RssFeedItems] ADD [Bookmarked] bit NOT NULL DEFAULT CAST(0 AS bit);

GO

ALTER TABLE [KeywordToExclude] ADD CONSTRAINT [FK_KeywordToExclude_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([Id]) ON DELETE CASCADE;

GO

ALTER TABLE [KeywordToInclude] ADD CONSTRAINT [FK_KeywordToInclude_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([Id]) ON DELETE CASCADE;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200925015746_AddBookmarked', N'3.0.0');

GO

