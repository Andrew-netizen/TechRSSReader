BEGIN TRANSACTION;
GO

CREATE TABLE [WeeklyBlogSummaries] (
    [Id] int NOT NULL IDENTITY,
    [BlogId] int NOT NULL,
    [ItemsExcluded] int NOT NULL,
    [ItemsRatedAtLeastThree] int NOT NULL,
    [NewItems] int NOT NULL,
    [ItemsRead] int NOT NULL,
    [WeekBegins] datetime2 NOT NULL,
    CONSTRAINT [PK_WeeklyBlogSummaries] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_WeeklyBlogSummaries_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_WeeklyBlogSummaries_BlogId] ON [WeeklyBlogSummaries] ([BlogId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20201125032543_WeeklyBlogSummary', N'5.0.0');
GO

COMMIT;
GO

