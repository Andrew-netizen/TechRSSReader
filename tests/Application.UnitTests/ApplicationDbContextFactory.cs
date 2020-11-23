using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;
using TechRSSReader.Infrastructure.Persistence;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Moq;
using System;
using System.Collections.Generic;
using TechRSSReader.Domain.ValueObjects;

namespace TechRSSReader.Application.UnitTests.Common
{
    public static class ApplicationDbContextFactory
    {
        public static ApplicationDbContext Create()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            var operationalStoreOptions = Options.Create(
                new OperationalStoreOptions
                {
                    DeviceFlowCodes = new TableConfiguration("DeviceCodes"),
                    PersistedGrants = new TableConfiguration("PersistedGrants")
                });

            var dateTimeMock = new Mock<IDateTime>();
            dateTimeMock.Setup(m => m.Now)
                .Returns(new DateTime(3001, 1, 1));

            var currentUserServiceMock = new Mock<ICurrentUserService>();
            currentUserServiceMock.Setup(m => m.UserId)
                .Returns("00000000-0000-0000-0000-000000000000");

            var context = new ApplicationDbContext(
                options, operationalStoreOptions, dateTimeMock.Object);

            context.Database.EnsureCreated();

            SeedSampleData(context);

            return context;
        }

        public static void SeedSampleData(ApplicationDbContext context)
        {
            context.TodoLists.AddRange(
                new TodoList { Id = 1, Title = "Shopping" }
            );

            context.TodoItems.AddRange(
                new TodoItem { Id = 1, ListId = 1, Title = "Bread", Done = true },
                new TodoItem { Id = 2, ListId = 1, Title = "Butter", Done = true },
                new TodoItem { Id = 3, ListId = 1, Title = "Milk" },
                new TodoItem { Id = 4, ListId = 1, Title = "Sugar" },
                new TodoItem { Id = 5, ListId = 1, Title = "Coffee" }
            );

            context.Blogs.Add(new Blog
            {
                Id = 1,
                Title = "Einstein Blog",
                XmlAddress = "http://einstein.com",
                KeywordsToInclude = new List<KeywordToInclude> { new KeywordToInclude { Keyword = "Physics" } },
                KeywordsToExclude = new List<KeywordToExclude> { new KeywordToExclude { Keyword = "Food" } },
                CreatedBy = "00000000-0000-0000-0000-000000000000"
            });

            context.RssFeedItems.Add(new RssFeedItem
            {
                Id = 1,
                Title = "A General Theory of Relativity",
                BlogId = 1,
                Bookmarked = true,
                Categories = "physics",
                CreatedBy = "00000000-0000-0000-0000-000000000000",
                ExcludedByKeyword = false,
                ReadAlready = false, 
                UserRatingPrediction = 1.5F
            });

            context.RssFeedItems.Add(new RssFeedItem
            {
                Id = 2,
                Title = "What I'm having for dinner",
                BlogId = 1,
                Categories = "food",
                ExcludedByKeyword = true, 
                UserRating = 1,
                CreatedBy = "00000000-0000-0000-0000-000000000000",
                ReadAlready = false, 
                UserRatingPrediction = 1.5F
            });

            context.RssFeedItems.Add(new RssFeedItem
            {
                Id = 3,
                Title = "Nothing in particular",
                BlogId = 1,
                Categories = "",
                ExcludedByKeyword = false,
                UserRating = 1,
                CreatedBy = "00000000-0000-0000-0000-000000000000",
                ReadAlready = true
            });

            context.Blogs.Add(new Blog
            {
                Id = 2,
                Title = "Slashdot", 
                XmlAddress = "http://rss.slashdot.org/Slashdot/slashdotMain",
                CreatedBy = "00000000-0000-0000-0000-000000000000"
            });

            context.Blogs.Add(new Blog
            {
                Id = 3,
                Title = "AWS News",
                XmlAddress = "http://aws.amazon.com/rss/whats-new.rss",
                CreatedBy = "00000000-0000-0000-0000-000000000000"
            });
            context.SaveChanges();
        }

        public static void Destroy(ApplicationDbContext context)
        {
            context.Database.EnsureDeleted();

            context.Dispose();
        }
    }
}