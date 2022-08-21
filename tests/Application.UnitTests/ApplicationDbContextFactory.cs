using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.Common.Utils;
using TechRSSReader.Domain.Entities;
using TechRSSReader.Infrastructure.Persistence;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Moq;
using System;
using System.Collections.Generic;
using TechRSSReader.Domain.ValueObjects;
using Duende.IdentityServer.EntityFramework.Options;

namespace TechRSSReader.Application.UnitTests.Common
{
    public static class ApplicationDbContextFactory
    {
        public static ApplicationDbContext Create()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            

            var dateTimeMock = new Mock<IDateTime>();
            dateTimeMock.Setup(m => m.Now)
                .Returns(new DateTime(3001, 1, 1));

            var currentUserServiceMock = new Mock<ICurrentUserService>();
            currentUserServiceMock.Setup(m => m.UserId)
                .Returns("00000000-0000-0000-0000-000000000000");
            var operationalStoreOptions = Options.Create(
                new OperationalStoreOptions
                {
                    DeviceFlowCodes = new TableConfiguration("DeviceCodes"),
                    PersistedGrants = new TableConfiguration("PersistedGrants")
                });

            var context = new ApplicationDbContext(
                options, operationalStoreOptions, dateTimeMock.Object);

            context.Database.EnsureCreated();

            SeedSampleData(context);

            return context;
        }

        public static void SeedSampleData(ApplicationDbContext context)
        {
            
            context.TodoLists.AddRange(
                new TodoList { Id = 1, Title = "Shopping", CreatedBy = string.Empty }
            );

            context.TodoItems.AddRange(
                new TodoItem { Id = 1, ListId = 1, Title = "Bread", Done = true, CreatedBy = string.Empty },
                new TodoItem { Id = 2, ListId = 1, Title = "Butter", Done = true, CreatedBy = string.Empty },
                new TodoItem { Id = 3, ListId = 1, Title = "Milk", CreatedBy = string.Empty },
                new TodoItem { Id = 4, ListId = 1, Title = "Sugar", CreatedBy = string.Empty },
                new TodoItem { Id = 5, ListId = 1, Title = "Coffee", CreatedBy = string.Empty }
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
                UserRatingPrediction = 1.5F, 
                Content = @"<script>alert('xss')</script><div onload=""alert('xss')"""
                        + @"style=""background-color: test"">Test Content<img src=""test.gif"""
                        + @"style=""background-image: url(javascript:alert('xss')); margin: 10px""></div>", 
                Description = @"<script>alert('xss')</script><div onload=""alert('xss')"""
                        + @"style=""background-color: test"">Test Description<img src=""test.gif"""
                        + @"style=""background-image: url(javascript:alert('xss')); margin: 10px""></div>",
                Link = string.Empty
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
                UserRatingPrediction = 1.5F,
                Link = String.Empty, 
                Content = String.Empty, 
                Description = string.Empty
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
                ReadAlready = true,
                Link = String.Empty,
                Content = String.Empty, 
                Description = String.Empty
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

            context.UserTags.Add(new UserTag
            {
                Id = 1,
                CreatedBy = "00000000-0000-0000-0000-000000000000",
                Text = "Physics"
            });

            context.UserTags.Add(new UserTag
            {
                Id = 2,
                CreatedBy = "00000000-0000-0000-0000-000000000000",
                Text = "Recipes"
            });

            context.FeedItemUserTags.Add(new FeedItemUserTag { RssFeedItemId = 1, UserTagId = 1 });

            context.FeedItemUserTags.Add(new FeedItemUserTag { RssFeedItemId = 2, UserTagId = 2 });

            context.WeeklyBlogSummaries.Add(new WeeklyBlogSummary
            {
                BlogId = 1,
                WeekBegins = DateUtility.GetLastMonday(DateTime.Today),
                NewItems = 5,
                ItemsRead = 6,
                ItemsExcluded = 3,
                ItemsRatedAtLeastThree = 3
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