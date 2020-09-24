using TechRSSReader.Infrastructure.Persistence;
using System;
using TechRSSReader.Application.Common.Interfaces;
using AutoMapper;
using TechRSSReader.Infrastructure.FeedReader.Maps;
using TechRSSReader.Application.Common.Mappings;

namespace TechRSSReader.Application.UnitTests.Common
{
    public class CommandTestBase : IDisposable
    {
        public CommandTestBase()
        {
            Context = ApplicationDbContextFactory.Create();
            
            var configurationProvider = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<RssFeedItemMap>();
                cfg.AddMaps(typeof(MappingProfile).Assembly);
            });

            Mapper = configurationProvider.CreateMapper();
            FeedReader = new StubFeedReader(Mapper);
            UserInterestPredictor = new StubUserInterestPredictor();
        }

        public ApplicationDbContext Context { get; }
        public IFeedReader FeedReader { get;  }
        public IMapper Mapper { get;  }
        public IUserInterestPredictor UserInterestPredictor { get; }

        public void Dispose()
        {
            ApplicationDbContextFactory.Destroy(Context);
        }
    }
}