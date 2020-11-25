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
    public class GetUnreadItemsQueryTests
    {

        private readonly ApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;
        private readonly IUserInterestPredictor _userInterestPredictor;

        public GetUnreadItemsQueryTests(QueryTestFixture fixture)
        {
            _context = fixture.Context;
            _currentUserService = fixture.CurrentUserService;
            _mapper = fixture.Mapper;
            _userInterestPredictor = fixture.UserInterestPredictor; 
        }

        [Fact]
        public async Task Handle()
        {
            var query = new GetUnreadItemsQuery();

            var handler = new GetUnreadItemsQuery.GetUnreadItemsQueryHandler(_context, _currentUserService, _mapper, _userInterestPredictor);

            var result = await handler.Handle(query, CancellationToken.None);

            result.ShouldBeOfType<FeedItemsViewModel>();

            // Exclude items that are read, and items that have been Excluded by Keyword.
            result.RssFeedItems.Count.ShouldBe(1);
            foreach (var item in result.RssFeedItems)
            {
                item.ReadAlready.ShouldBeFalse();
                item.ExcludedByKeyword.HasValue.ShouldBeTrue();
                item.BlogTitle.ShouldNotBeNullOrWhiteSpace();
            }
        }
    }
}
