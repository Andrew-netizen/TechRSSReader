using AutoMapper;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Queries.GetBlogs;
using TechRSSReader.Application.Blogs.Queries.GetBlogWithItems;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.UnitTests.Common;
using TechRSSReader.Infrastructure.Persistence;
using Xunit;

namespace TechRSSReader.Application.UnitTests.Blogs.Queries
{
    [Collection("QueryTests")]
    public class GetBlogWIthItemsQueryTests
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUserInterestPredictor _userInterestPredictor;

        public GetBlogWIthItemsQueryTests(QueryTestFixture fixture)
        {
            _context = fixture.Context;
            _mapper = fixture.Mapper;
            _userInterestPredictor = fixture.UserInterestPredictor; 
        }

        [Fact]
        public async Task Handle_ReturnsCorrect()
        {
            var query = new GetBlogWithItemsQuery();
            query.Id = 1; 

            var handler = new GetBlogWithItemsQuery.GetBlogWithItemsQueryHandler(_context, _mapper, _userInterestPredictor);

            var result = await handler.Handle(query, CancellationToken.None);

            result.ShouldBeOfType(typeof(BlogDetailsDto));
            result.RssFeedItems.Count.ShouldBe(3);
            result.RssFeedItems[0].UserRatingPrediction.HasValue.ShouldBeTrue();
            result.RssFeedItems[0].UserRatingPrediction.Value.ShouldBe(1.5F);
            result.RssFeedItems[1].UserRatingPrediction.Value.ShouldBe(1.5F);
            result.RssFeedItems[2].UserRatingPrediction.Value.ShouldBe(1.5F);

            result.KeywordsToExclude.Count.ShouldBe(1);
            result.KeywordsToInclude.Count.ShouldBe(1);
        }

    }
}
