using AutoMapper;
using Moq;
using Shouldly;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Queries.GetBlogs;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.UnitTests.Common;
using TechRSSReader.Infrastructure.Persistence;
using Xunit;

namespace TechRSSReader.Application.UnitTests.Blogs.Queries
{
    [Collection("QueryTests")]
    public class GetBlogsQueryTests
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        
        public GetBlogsQueryTests(QueryTestFixture fixture)
        {
            _context = fixture.Context;
            _mapper = fixture.Mapper;
            
        }

        [Fact]
        public async Task Handle_ReturnsCorrect()
        {
            var query = new GetBlogsQuery();

            var currentUserServiceMock = new Mock<ICurrentUserService>();
            currentUserServiceMock.Setup(m => m.UserId)
                .Returns("00000000-0000-0000-0000-000000000000");

            var handler = new GetBlogsQuery.GetBlogsQueryHandler(_context, _mapper, currentUserServiceMock.Object);

            var result = await handler.Handle(query, CancellationToken.None);

            result.ShouldBeOfType<BlogsViewModel>();
            result.Blogs.Count.ShouldBe(3);

            var blog = result.Blogs.Where(blog => blog.Title == "Einstein Blog").First();

            blog.KeywordsToExclude.Count.ShouldBe(1);
            blog.KeywordsToInclude.Count.ShouldBe(1);
        }
    }
}
