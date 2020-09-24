using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using TechRSSReader.Infrastructure.FeedReader.Maps;
using TechRSSReader.Infrastructure.InterestPredictor.Maps;

namespace TechRSSReader.Infrastructure.IntegrationTests
{
    public class CsvFileTestFixture : IDisposable
    {
        private bool disposedValue;

        public IMapper Mapper { get; }

        public CsvFileTestFixture()
        {
            var configurationProvider = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<RssFeedItemMap>();
                cfg.AddProfile<StarRatingInputMap>();
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
        // ~CsvFileTestFixture()
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
