using AutoMapper;
using Shouldly;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Queries.GetAllUserBlogs;
using TechRSSReader.Application.UnitTests.Common;
using TechRSSReader.Domain.Entities;
using TechRSSReader.Infrastructure.Persistence;
using Xunit;

namespace TechRSSReader.Application.UnitTests.Blogs.Queries
{
    [Collection("QueryTests")]
    public class GetAllUserBlogsQueryTests
    {
        private readonly ApplicationDbContext _context;
        
        public GetAllUserBlogsQueryTests(QueryTestFixture fixture)
        {
            _context = fixture.Context;
        }

        [Fact]
        public async Task Handle_ReturnsCorrect()
        {
            var query = new GetAllUserBlogsQuery();
            

            var handler = new GetAllUserBlogsQuery.GetAllUserBlogsQueryHandler(_context);

            var result = await handler.Handle(query, CancellationToken.None);

            result.ShouldBeOfType<List<Blog>>();
            result.Count.ShouldBe(3);

            var blog = result.Where(blog => blog.Title == "Einstein Blog").First();

            blog.Id.ShouldBe(1);
        }

    }
}
