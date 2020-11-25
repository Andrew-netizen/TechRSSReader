using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using Shouldly;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.UnitTests.Common;
using TechRSSReader.Application.WeeklyBlogSummaries.Commands.CreateWeeklyBlogSummary;
using TechRSSReader.Application.WeeklyBlogSummaries.Queries;
using TechRSSReader.Domain.Entities;
using Xunit;

namespace TechRSSReader.Application.UnitTests.WeeklyBlogSummaries.Commands
{
    public class CreateWeeklyBlogSummaryCommandTests : CommandTestBase
    {
        [Fact]
        public async Task Handle_Valid()
        {

            SetupTestData();

            var command = new CreateWeeklyBlogSummaryCommand
            {
                BlogId = 10,
                WeekBegins = new DateTime(2020,11,16)
            };

            var loggerMock = new Mock<ILogger<CreateWeeklyBlogSummaryCommand.CreateWeeklyBlogSummaryCommandHandler>>();
            var handler = new CreateWeeklyBlogSummaryCommand.CreateWeeklyBlogSummaryCommandHandler(Context, Mapper, loggerMock.Object);

            WeeklyBlogSummaryDto result = await handler.Handle(command, CancellationToken.None);

            result.BlogId.ShouldBe(command.BlogId);
            result.WeekBegins.ShouldBe(command.WeekBegins);
            result.NewItems.ShouldBe(1);

            WeeklyBlogSummary dbResult = await Context.WeeklyBlogSummaries
                                        .Where(item => item.BlogId == command.BlogId)
                                        .Where(item => item.WeekBegins.Equals(command.WeekBegins))
                                        .FirstOrDefaultAsync();

            dbResult.ShouldNotBeNull();

        }

        private void SetupTestData()
        {
            Context.Blogs.Add(new Blog
            {
                Id = 10,
                Title = "Slashdot", 
                CreatedBy = CurrentUserService.UserId
            });

            Context.RssFeedItems.Add(ItemCreatedOnDate(10, new DateTime(2020,11,20)));

            Context.SaveChanges();
        }

        private RssFeedItem ItemCreatedOnDate(int blogId, DateTime dateTime)
        {
            return new RssFeedItem
            {
                BlogId = blogId,
                Created = dateTime, 
                CreatedBy = CurrentUserService.UserId
            };
        }
    }

}
