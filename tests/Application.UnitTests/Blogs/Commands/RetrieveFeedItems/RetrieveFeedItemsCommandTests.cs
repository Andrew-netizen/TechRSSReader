using Shouldly;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Commands.RetrieveFeedItems;
using TechRSSReader.Application.UnitTests.Common;
using TechRSSReader.Domain.Entities;
using Xunit;

namespace TechRSSReader.Application.UnitTests.Blogs.Commands.RetrieveFeedItems
{
    public class RetrieveFeedItemsCommandTests: CommandTestBase
    {

        /// <summary>
        /// This is a test for a valid data load. 
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task Handle_LoadSlashdot()
        {
            Blog slashdot = new Blog { Title = "Slashot", XmlAddress= "http://rss.slashdot.org/Slashdot/slashdotMain" };
            Context.Blogs.Add(slashdot);
            Context.SaveChanges();

            RetrieveFeedItemsCommand command = new RetrieveFeedItemsCommand
            {
                BlogId = slashdot.Id
            };


            var handler = new RetrieveFeedItemsCommand.RetrieveFeedItemsCommandHandler(Context, FeedReader);

            var result = await handler.Handle(command, CancellationToken.None);

            result.ShouldBeGreaterThan(0);

            List<RssFeedItem> retrievedItems =
                Context.RssFeedItems
                .Where(item => item.BlogId == slashdot.Id)
                .ToList<RssFeedItem>();

            result.ShouldBe(retrievedItems.Count);

            int retrievedItemsCount = retrievedItems.Count; 

            result = await handler.Handle(command, CancellationToken.None);

            result.ShouldBe(0);

            retrievedItems =
                Context.RssFeedItems
                .Where(item => item.BlogId == slashdot.Id)
                .ToList<RssFeedItem>();

            // No more items should have been added into the database. 
            retrievedItems.Count.ShouldBe(retrievedItemsCount);


        }

        /// <summary>
        /// This is a test data load for some data that initially had validation errors.
        /// </summary>
        /// <returns></returns>
        [Fact]
        public async Task Handle_LoadAWSNews()
        {
            Blog awsNews = new Blog { Title = "AWS News", XmlAddress = "https://aws.amazon.com/about-aws/whats-new/recent/feed/" };
            Context.Blogs.Add(awsNews);
            Context.SaveChanges();

            RetrieveFeedItemsCommand command = new RetrieveFeedItemsCommand
            {
                BlogId = awsNews.Id
            };


            var handler = new RetrieveFeedItemsCommand.RetrieveFeedItemsCommandHandler(Context, FeedReader);

            var result = await handler.Handle(command, CancellationToken.None);

            result.ShouldBeGreaterThan(0);

        }
    }
}
