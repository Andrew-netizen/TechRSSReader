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
        private readonly IUserInterestPredictor _userInterestPredictor;

        public GetBookmarkedItemsQueryTests(QueryTestFixture fixture)
        {
            _context = fixture.Context;
            _currentUserService = fixture.CurrentUserService; 
            _mapper = fixture.Mapper;
            _userInterestPredictor = fixture.UserInterestPredictor; 
        }

        [Fact]
        public async Task Handle_ReturnsCorrect()
        {
            var query = new GetBookmarkedItemsQuery();

            var handler = new GetBookmarkedItemsQuery.GetBookmarkedItemsQueryHandler(_context, _currentUserService, _mapper, _userInterestPredictor);

            var result = await handler.Handle(query, CancellationToken.None);

            result.ShouldBeOfType<FeedItemsViewModel>();

            result.RssFeedItems.Count.ShouldBe(1);
            result.RssFeedItems[0].BlogTitle.ShouldNotBeNullOrWhiteSpace();
        }
    }
}
