using AutoMapper;
using Shouldly;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.RssFeedItems.Queries;
using TechRSSReader.Application.UnitTests.Common;
using TechRSSReader.Domain.Entities;
using TechRSSReader.Infrastructure.Persistence;
using Xunit;

namespace TechRSSReader.Application.UnitTests.RssFeedItems.Queries
{
    [Collection("QueryTests")]
    public class GetTopRatedFeedItemsQueryTests
    {
        private readonly ApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public GetTopRatedFeedItemsQueryTests(QueryTestFixture fixture)
        {
            _context = fixture.Context;
            _currentUserService = fixture.CurrentUserService;
            _mapper = fixture.Mapper;
        }

        [Fact]
        public async Task Handle()
        {
            var query = new GetTopRatedFeedItemsQuery();

            var handler = new GetTopRatedFeedItemsQuery.GetTopRatedFeedItemsQueryHandler(_context, _currentUserService, _mapper);

            FeedItemsViewModel result = await handler.Handle(query, CancellationToken.None);
            List<RssFeedItemDto> resultFeedItems = result.RssFeedItems.ToList();
            resultFeedItems.ShouldNotBeNull();
            // RSS Feed Item 3 has been read already, and so should not be returned in this query.
            // RSS Feed Item 2 has been Excluded by Keywords, and so won't be returned in this query.
            resultFeedItems.Count.ShouldBe(1);
            RssFeedItemDto firstFeedItem = resultFeedItems[0];
            firstFeedItem.Id.ShouldBe(1);
            firstFeedItem.UserRatingPrediction.ShouldBe(4F);
        }
    }
}
