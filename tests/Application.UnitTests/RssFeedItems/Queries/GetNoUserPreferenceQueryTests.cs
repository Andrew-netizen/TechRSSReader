using AutoMapper;
using Shouldly;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.RssFeedItems.Queries;
using TechRSSReader.Application.UnitTests.Common;
using TechRSSReader.Infrastructure.Persistence;
using Xunit;

namespace TechRSSReader.Application.UnitTests.RssFeedItems.Queries
{
    [Collection("QueryTests")]
    public class GetNoUserPreferenceQueryTests
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetNoUserPreferenceQueryTests(QueryTestFixture fixture)
        {
            _context = fixture.Context;
            _mapper = fixture.Mapper;
        }

        [Fact]
        public async Task Handle_ReturnsCorrect()
        {

            var query = new GetNoUserPreferenceQuery
            {
                BlogId = 1
            };

            var handler = new GetNoUserPreferenceQuery.GetNoUserPreferenceQueryHandler(_context, _mapper);

            var result = await handler.Handle(query, CancellationToken.None);

            result.ShouldBeOfType<RssFeedItemDto>();
            result.Id.ShouldBe(1);
                        
            
        }
    }
}
