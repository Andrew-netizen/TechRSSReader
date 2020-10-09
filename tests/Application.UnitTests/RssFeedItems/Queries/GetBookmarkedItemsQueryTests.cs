using AutoMapper;
using Shouldly;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.RssFeedItems.Queries;
using TechRSSReader.Application.UnitTests.Common;
using TechRSSReader.Infrastructure.Persistence;
using Xunit;

namespace TechRSSReader.Application.UnitTests.RssFeedItems.Queries
{
    [Collection("QueryTests")]
    public class GetBookmarkedItemsQueryTests
    {
        private readonly ApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService; 
        private readonly IMapper _mapper;

        public GetBookmarkedItemsQueryTests(QueryTestFixture fixture)
        {
            _context = fixture.Context;
            _currentUserService = fixture.CurrentUserService; 
            _mapper = fixture.Mapper;
        }

        [Fact]
        public async Task Handle_ReturnsCorrect()
        {
            var query = new GetBookmarkedItemsQuery();

            var handler = new GetBookmarkedItemsQuery.GetBookmarkedItemsQueryHandler(_context, _currentUserService, _mapper);

            var result = await handler.Handle(query, CancellationToken.None);

            result.ShouldBeOfType<FeedItemsViewModel>();

            result.RssFeedItems.Count.ShouldBe(1);
        }
    }
}
