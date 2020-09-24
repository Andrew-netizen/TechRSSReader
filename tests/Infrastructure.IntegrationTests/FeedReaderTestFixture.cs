using AutoMapper;
using System;
using TechRSSReader.Infrastructure.FeedReader.Maps;

namespace TechRSSReader.Infrastructure.IntegrationTests
{
    public class FeedReaderTestFixture : IDisposable
    {
        private bool disposedValue;

        public IMapper Mapper { get; }
        
        public FeedReaderTestFixture()
        {
            var configurationProvider = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<RssFeedItemMap>();
            });

            Mapper = configurationProvider.CreateMapper();
            
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects)
                }

                // TODO: free unmanaged resources (unmanaged objects) and override finalizer
                // TODO: set large fields to null
                disposedValue = true;
            }
        }

        // // TODO: override finalizer only if 'Dispose(bool disposing)' has code to free unmanaged resources
        // ~FeedReaderTestFixture()
        // {
        //     // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
        //     Dispose(disposing: false);
        // }

        public void Dispose()
        {
            // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}
