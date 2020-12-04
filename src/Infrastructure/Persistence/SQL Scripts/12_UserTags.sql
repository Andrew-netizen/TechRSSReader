BEGIN TRANSACTION;
GO

CREATE TABLE [UserTags] (
    [Id] int NOT NULL IDENTITY,
    [Text] nvarchar(100) NOT NULL,
    [CreatedBy] nvarchar(450) NOT NULL,
    [Created] datetime2 NOT NULL,
    [LastModifiedBy] nvarchar(450) NULL,
    [LastModified] datetime2 NULL,
    CONSTRAINT [PK_UserTags] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [FeedItemUserTags] (
    [RssFeedItemId] int NOT NULL,
    [UserTagId] int NOT NULL,
    CONSTRAINT [PK_FeedItemUserTags] PRIMARY KEY ([RssFeedItemId], [UserTagId]),
    CONSTRAINT [FK_FeedItemUserTags_RssFeedItems_RssFeedItemId] FOREIGN KEY ([RssFeedItemId]) REFERENCES [RssFeedItems] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_FeedItemUserTags_UserTags_UserTagId] FOREIGN KEY ([UserTagId]) REFERENCES [UserTags] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_FeedItemUserTags_UserTagId] ON [FeedItemUserTags] ([UserTagId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20201130020826_UserTags', N'5.0.0');
GO

COMMIT;
GO

