using AutoMapper;
using Shouldly;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.UnitTests.Common;
using TechRSSReader.Application.WeeklyBlogSummaries.Queries;
using TechRSSReader.Domain.Entities;
using TechRSSReader.Infrastructure.Persistence;
using Xunit;

namespace TechRSSReader.Application.UnitTests.WeeklyBlogSummaries.Queries
{
    [Collection("QueryTests")]
    public class GetSummaryForWeekQueryTests
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetSummaryForWeekQueryTests(QueryTestFixture fixture)
        {
            _context = fixture.Context;
            _mapper = fixture.Mapper;
        }

        [Fact]
        public async Task Handle_ReturnsNull()
        {
            var query = new GetSummaryForWeekQuery
            {
                BlogId = 1, 
                WeekBegins = new DateTime(2000,1,1)
            };

            var handler = new GetSummaryForWeekQuery.GetSummaryForWeekQueryHandler(_context, _mapper);
            WeeklyBlogSummaryDto result = await handler.Handle(query, CancellationToken.None);

            result.ShouldBeNull();
        }

        [Fact]
        public async Task Handle_ReturnsValid()
        {
            var query = new GetSummaryForWeekQuery
            {
                BlogId = 1,
                WeekBegins = new DateTime(2020, 11, 16)
            };

            var handler = new GetSummaryForWeekQuery.GetSummaryForWeekQueryHandler(_context, _mapper);
            WeeklyBlogSummaryDto result = await handler.Handle(query, CancellationToken.None);

            WeeklyBlogSummary weeklyBlogSummary = _context.WeeklyBlogSummaries
                                        .Where(item => item.BlogId == 1)
                                        .Where(item => item.WeekBegins.Equals(query.WeekBegins)).FirstOrDefault();

            result.ShouldNotBeNull();
            result.BlogId.ShouldBe(weeklyBlogSummary.BlogId);
            result.NewItems.ShouldBe(weeklyBlogSummary.NewItems);
            result.ItemsExcluded.ShouldBe(weeklyBlogSummary.ItemsExcluded);
            result.ItemsRatedAtLeastThree.ShouldBe(weeklyBlogSummary.ItemsRatedAtLeastThree);
            result.ItemsRead.ShouldBe(weeklyBlogSummary.ItemsRead);
            
        }

    }
}
