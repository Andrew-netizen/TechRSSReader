ALTER TABLE [KeywordToExclude] DROP CONSTRAINT [FK_KeywordToExclude_Blogs_BlogId];

GO

ALTER TABLE [KeywordToInclude] DROP CONSTRAINT [FK_KeywordToInclude_Blogs_BlogId];

GO

CREATE TABLE [RssFeedItems] (
    [Id] int NOT NULL IDENTITY,
    [CreatedBy] nvarchar(450) NOT NULL,
    [Created] datetime2 NOT NULL,
    [LastModifiedBy] nvarchar(450) NULL,
    [LastModified] datetime2 NULL,
    [Author] nvarchar(200) NULL,
    [BlogId] int NOT NULL,
    [Categories] nvarchar(200) NULL,
    [Content] nvarchar(max) NULL,
    [Description] nvarchar(max) NULL,
    [Link] nvarchar(1000) NOT NULL,
    [PublishingDate] datetime2 NULL,
    [PublishingDateString] nvarchar(100) NULL,
    [RetrievedDateTime] datetime2 NOT NULL,
    [RssId] nvarchar(500) NULL,
    [Title] nvarchar(500) NOT NULL,
    [UserInterested] bit NULL,
    [UserInterestPrediction] bit NULL,
    CONSTRAINT [PK_RssFeedItems] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_RssFeedItems_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([Id]) ON DELETE CASCADE
);

GO

CREATE INDEX [IX_RssFeedItems_BlogId] ON [RssFeedItems] ([BlogId]);

GO

ALTER TABLE [KeywordToExclude] ADD CONSTRAINT [FK_KeywordToExclude_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([Id]) ON DELETE CASCADE;

GO

ALTER TABLE [KeywordToInclude] ADD CONSTRAINT [FK_KeywordToInclude_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([Id]) ON DELETE CASCADE;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200908025450_RssFeedItems', N'3.0.0');

GO

