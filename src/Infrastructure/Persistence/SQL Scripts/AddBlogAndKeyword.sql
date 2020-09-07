CREATE TABLE [Blogs] (
    [Id] int NOT NULL IDENTITY,
    [CreatedBy] nvarchar(450) NOT NULL,
    [Created] datetime2 NOT NULL,
    [LastModifiedBy] nvarchar(450) NULL,
    [LastModified] datetime2 NULL,
    [Title] nvarchar(200) NOT NULL,
    [XmlAddress] nvarchar(500) NOT NULL,
    CONSTRAINT [PK_Blogs] PRIMARY KEY ([Id])
);

GO

CREATE TABLE [KeywordToExclude] (
    [BlogId] int NOT NULL,
    [Keyword] nvarchar(50) NOT NULL,
    CONSTRAINT [PK_KeywordToExclude] PRIMARY KEY ([BlogId], [Keyword]),
    CONSTRAINT [FK_KeywordToExclude_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([Id]) ON DELETE CASCADE
);

GO

CREATE TABLE [KeywordToInclude] (
    [BlogId] int NOT NULL,
    [Keyword] nvarchar(50) NOT NULL,
    CONSTRAINT [PK_KeywordToInclude] PRIMARY KEY ([BlogId], [Keyword]),
    CONSTRAINT [FK_KeywordToInclude_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [Blogs] ([Id]) ON DELETE CASCADE
);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200904060601_AddBlogAndKeyword', N'3.0.0');

GO

