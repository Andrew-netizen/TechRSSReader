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

namespace TechRSSReader.Application.UnitTests
{
    public class StubFeedReader : IFeedReader
    {

        private readonly IMapper _mapper;

        public StubFeedReader(IMapper mapper)
        {
            _mapper = mapper; 
        }
        public async Task<FeedReadResult> ReadAsync(string uri, CancellationToken cancellationToken)
        {
            FeedReadResult result = new FeedReadResult();
            string rssContentFile = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) + @"\slashdot-2020-05-06.xml";

            Feed feed = await FeedReader.ReadFromFileAsync(rssContentFile, cancellationToken);
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
