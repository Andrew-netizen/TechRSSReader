using System;
using AutoMapper;
using Moq;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.Common.Mappings;
using TechRSSReader.Infrastructure.Persistence;
using TechRSSReader.Infrastructure.Services;
using Xunit;

namespace TechRSSReader.Application.UnitTests.Common
{
    public sealed class QueryTestFixture : IDisposable
    {
        #region Constructor

        public QueryTestFixture()
        {
            Context = ApplicationDbContextFactory.Create();

            var configurationProvider = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });

            Mapper = configurationProvider.CreateMapper();
            UserInterestPredictor = new StubUserInterestPredictor();

            var currentUserServiceMock = new Mock<ICurrentUserService>();
            currentUserServiceMock.Setup(m => m.UserId)
                .Returns("00000000-0000-0000-0000-000000000000");

            CurrentUserService = currentUserServiceMock.Object;

            HtmlSanitizationService = new HtmlSanitizationService();

        }

        #endregion Constructor

        #region Public Properties 

        public ApplicationDbContext Context { get; }

        public ICurrentUserService CurrentUserService { get; }

        public IHtmlSanitizationService HtmlSanitizationService { get; }

        public IMapper Mapper { get; }

        public IUserInterestPredictor UserInterestPredictor { get; }

        #endregion Public Properties

        public void Dispose()
        {
            ApplicationDbContextFactory.Destroy(Context);
        }
    }

    [CollectionDefinition("QueryTests")]
    public class QueryCollection : ICollectionFixture<QueryTestFixture> { }
}