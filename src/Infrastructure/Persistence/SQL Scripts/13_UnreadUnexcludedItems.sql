BEGIN TRANSACTION;
GO

ALTER TABLE [Blogs] ADD [UnreadUnexcludedItems] int NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20201210070421_UnreadUnexcludedItems', N'5.0.0');
GO

COMMIT;
GO

