using AutoMapper;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Queries.GetBlogs;
using TechRSSReader.Application.Blogs.Queries.GetBlogWithItems;
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

        public GetBlogWIthItemsQueryTests(QueryTestFixture fixture)
        {
            _context = fixture.Context;
            _mapper = fixture.Mapper;
        }

        [Fact]
        public async Task Handle_ReturnsCorrect()
        {
            var query = new GetBlogWithItemsQuery();

            var handler = new GetBlogWithItemsQuery.GetBlogWithItemsQueryHandler(_context, _mapper);

            var result = await handler.Handle(query, CancellationToken.None);

            result.ShouldBeOfType(typeof(BlogDto));
            result.RssFeedItems.Count.ShouldBe(1);

            
            result.KeywordsToExclude.Count.ShouldBe(1);
            result.KeywordsToInclude.Count.ShouldBe(1);
        }

    }
}
