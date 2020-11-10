ALTER TABLE [KeywordToExclude] DROP CONSTRAINT [FK_KeywordToExclude_Blogs_BlogId];

GO

ALTER TABLE [KeywordToInclude] DROP CONSTRAINT [FK_KeywordToInclude_Blogs_BlogId];

GO

ALTER TABLE [RssFeedItems] ADD [ExcludedByKeyword] bit NULL;

GO

CREATE INDEX [IX_RssFeedItems_BlogId_ReadAlready_ExcludedByKeyword] ON [RssFeedItems] ([BlogId], [ReadAlready], [ExcludedByKeyword]);

GO

ALTER TABLE [KeywordToExclude] ADD CONSTRAINT [FK_KeywordToExclude_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([Id]) ON DELETE CASCADE;

GO

ALTER TABLE [KeywordToInclude] ADD CONSTRAINT [FK_KeywordToInclude_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([Id]) ON DELETE CASCADE;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20201110013109_AddExcludedByKeyword', N'3.0.0');

GO

