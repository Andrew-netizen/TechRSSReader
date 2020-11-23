BEGIN TRANSACTION;
GO

ALTER TABLE [RssFeedItems] ADD [UserRatedDate] datetime2 NULL;
GO

ALTER TABLE [RssFeedItems] ADD [UserReadDate] datetime2 NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20201122234702_AddReadRatedDate', N'5.0.0');
GO

COMMIT;
GO

