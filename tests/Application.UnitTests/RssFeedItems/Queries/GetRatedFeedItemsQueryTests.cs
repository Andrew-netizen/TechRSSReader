using Shouldly;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.RssFeedItems.Queries;
using TechRSSReader.Application.UnitTests.Common;
using TechRSSReader.Domain.Entities;
using TechRSSReader.Infrastructure.Persistence;
using Xunit;

namespace TechRSSReader.Application.UnitTests.RssFeedItems.Queries
{
    [Collection("QueryTests")]
    public class GetRatedFeedItemsQueryTests
    {
        private readonly ApplicationDbContext _context;

        public GetRatedFeedItemsQueryTests(QueryTestFixture fixture)
        {
            _context = fixture.Context;
        }

        [Fact]
        public async Task Handle()
        {
            var query = new GetRatedFeedItemsQuery();

            var handler = new GetRatedFeedItemsQuery.GetRatedFeedItemsQueryHandler(_context);

            var result = await handler.Handle(query, CancellationToken.None);
            List<RssFeedItem> resultFeedItems = result as List<RssFeedItem>;
            resultFeedItems.ShouldNotBeNull();
            RssFeedItem firstFeedItem = resultFeedItems[0];
            firstFeedItem.Id.ShouldBe(2);
            firstFeedItem.UserRating.HasValue.ShouldBeTrue();
        }
    }
}
