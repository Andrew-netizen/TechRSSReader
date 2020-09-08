using AutoMapper; 
using CodeHollow.FeedReader;
using System;
using System.IO;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.Common.Models;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Infrastructure.FeedReader
{
    public class RssFeedReader : IFeedReader
    {
        private readonly IMapper _mapper;

        public RssFeedReader(IMapper mapper)
        {
            _mapper = mapper; 
        }

        public async Task<FeedReadResult> ReadAsync(string uri, CancellationToken cancellationToken)
        {
            FeedReadResult result = new FeedReadResult();
                        
            Feed feed = await CodeHollow.FeedReader.FeedReader.ReadAsync(uri, cancellationToken);
            DateTime dateRetrieved = DateTime.Now;

            foreach (FeedItem item in feed.Items)
            {
                RssFeedItem rssFeedItem = _mapper.Map<RssFeedItem>(item);
                rssFeedItem.RetrievedDateTime = dateRetrieved;    
                result.RssFeedItems.Add(rssFeedItem);
            }

            return result;
        }
    }
}
