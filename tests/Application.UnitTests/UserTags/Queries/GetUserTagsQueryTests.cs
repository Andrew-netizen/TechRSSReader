using AutoMapper;
using Microsoft.Extensions.Logging;
using Moq;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.UnitTests.Common;
using TechRSSReader.Application.UserTags.Queries.GetUserTags;
using TechRSSReader.Infrastructure.Persistence;
using Xunit;

namespace TechRSSReader.Application.UnitTests.UserTags.Queries
{
    [Collection("QueryTests")]
    public class GetUserTagsQueryTests
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetUserTagsQueryTests(QueryTestFixture fixture)
        {
            _context = fixture.Context;
            _mapper = fixture.Mapper;

        }

        [Fact]
        public async Task Handle_ReturnsCorrect()
        {
            var query = new GetUserTagsQuery();

            var currentUserServiceMock = new Mock<ICurrentUserService>();
            currentUserServiceMock.Setup(m => m.UserId)
                .Returns("00000000-0000-0000-0000-000000000000");

            var loggerMock = new Mock<ILogger<GetUserTagsQuery.GetUserTagsQueryHandler>>();


            var handler = new GetUserTagsQuery.GetUserTagsQueryHandler(_context, _mapper, currentUserServiceMock.Object, loggerMock.Object);

            var result = await handler.Handle(query, CancellationToken.None);

            result.ShouldBeOfType<UserTagsViewModel>();
            result.UserTags.Count.ShouldBe(2);

        }
    }
}
