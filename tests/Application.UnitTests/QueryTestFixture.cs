using System;
using AutoMapper;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.Common.Mappings;
using TechRSSReader.Infrastructure.Persistence;
using Xunit;

namespace TechRSSReader.Application.UnitTests.Common
{
    public sealed class QueryTestFixture : IDisposable
    {
        public QueryTestFixture()
        {
            Context = ApplicationDbContextFactory.Create();

            var configurationProvider = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });

            Mapper = configurationProvider.CreateMapper();
            UserInterestPredictor = new StubUserInterestPredictor();
        }
        public ApplicationDbContext Context { get; }

        public IMapper Mapper { get; }

        public IUserInterestPredictor UserInterestPredictor { get; }

        public void Dispose()
        {
            ApplicationDbContextFactory.Destroy(Context);
        }
    }

    [CollectionDefinition("QueryTests")]
    public class QueryCollection : ICollectionFixture<QueryTestFixture> { }
}