using CodeHollow.FeedReader;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Models;
using TechRSSReader.Domain.Entities;
using TechRSSReader.Infrastructure.FeedReader;
using Xunit;

namespace TechRSSReader.Infrastructure.IntegrationTests.FeedReader
{

    public class RssFeedReaderTests: IClassFixture<FeedReaderTestFixture>
    {
        private readonly FeedReaderTestFixture _fixture;

        public RssFeedReaderTests(FeedReaderTestFixture fixture)
        {
            _fixture = fixture;
        }

        [Fact]
        public async Task QuerySlashdot()
        {

            Blog slashdot = new Blog();
            slashdot.XmlAddress = "http://rss.slashdot.org/Slashdot/slashdotMain";
            slashdot.Title = "Slashdot";

            RssFeedReader target = new RssFeedReader(_fixture.Mapper);
            FeedReadResult result = await target.ReadAsync(slashdot.XmlAddress, CancellationToken.None);
            DateTime present = DateTime.Now;
            
            Feed slashdotFeed = await CodeHollow.FeedReader.FeedReader.ReadAsync(slashdot.XmlAddress);

            result.RssFeedItems.Count.ShouldBe(slashdotFeed.Items.Count);

            List<FeedItem> slashdotItems = slashdotFeed.Items.ToList<FeedItem>();
            for (int index = 0; index < slashdotFeed.Items.Count; index++)
            {
                RssFeedItem resultItem = result.RssFeedItems[index];
                FeedItem expectedFeedItem = slashdotItems[index];
                resultItem.RssId.ShouldBe(expectedFeedItem.Id);
                resultItem.Title.ShouldBe(expectedFeedItem.Title);
                resultItem.Description.ShouldBe(expectedFeedItem.Description);
                resultItem.Author.ShouldBe(expectedFeedItem.Author);
                resultItem.Id.ShouldBe(0);
                resultItem.PublishingDate.ShouldBe(expectedFeedItem.PublishingDate);
                resultItem.PublishingDateString.ShouldBe(expectedFeedItem.PublishingDateString);
                // Make sure that the retrieval date has been set to something like the present.
                Math.Abs(resultItem.RetrievedDateTime.Subtract(present).TotalSeconds).ShouldBeLessThan(5);
            }

        }
    }
}

