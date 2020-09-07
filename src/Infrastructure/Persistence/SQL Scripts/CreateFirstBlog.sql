USE [TechRSSReaderDb]
GO

BEGIN TRAN 

DECLARE @test DATETIME2 = '2020-09-03 10:00:00.000';
INSERT INTO [dbo].[Blogs]
           ([CreatedBy]
           ,[Created]
           ,[LastModifiedBy]
           ,[LastModified]
           ,[Title]
           ,[XmlAddress])
     VALUES
           ('f361f64d-4b3e-4202-9e7c-2a36c91a35e2'
           ,@test
           ,NULL
           ,NULL
           ,'Scott Hanselman''s Blog'
           ,'http://feeds.feedburner.com/ScottHanselman')

		   COMMIT TRAN 
GO

FROM [dbo].[Blogs]


