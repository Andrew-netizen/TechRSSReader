using AutoMapper;
using Shouldly;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.UnitTests.Common;
using TechRSSReader.Application.WeeklyBlogSummaries.Queries;
using TechRSSReader.Domain.Entities;
using TechRSSReader.Infrastructure.Persistence;
using Xunit;

namespace TechRSSReader.Application.UnitTests.WeeklyBlogSummaries.Queries
{
    [Collection("QueryTests")]
    public class GetLatestSummariesQueryTests
    {

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GetLatestSummariesQueryTests(QueryTestFixture fixture)
        {
            _context = fixture.Context;
            _mapper = fixture.Mapper;
            _currentUserService = fixture.CurrentUserService; 
        }

        [Fact]
        public async Task Handle_ReturnsValid()
        {
            var query = new GetLatestSummariesQuery
            {
                BlogId = 1
            };

            var handler = new GetLatestSummariesQuery.GetLatestSummariesQueryHandler(_context, _mapper, _currentUserService);
            WeeklyBlogSummaryViewModel result = await handler.Handle(query, CancellationToken.None);

            List<WeeklyBlogSummary> weeklyBlogSummaries = _context.WeeklyBlogSummaries
                                        .Where(item => item.BlogId == 1)
                                        .OrderByDescending(item => item.WeekBegins)
                                        .ToList();

            result.ShouldNotBeNull();
            result.WeeklyBlogSummaries.Count.ShouldBe(1);
            WeeklyBlogSummaryDto firstResult = result.WeeklyBlogSummaries[0];
            WeeklyBlogSummary expectedResult = weeklyBlogSummaries[0];
            
            firstResult.BlogId.ShouldBe(expectedResult.BlogId);
            firstResult.NewItems.ShouldBe(expectedResult.NewItems);
            firstResult.ItemsExcluded.ShouldBe(expectedResult.ItemsExcluded);
            firstResult.ItemsRatedAtLeastThree.ShouldBe(expectedResult.ItemsRatedAtLeastThree);
            firstResult.ItemsRead.ShouldBe(expectedResult.ItemsRead);

        }

    }
}
