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

        [Fact]
        public async Task Handle_LoadSlashdot()
        {
            Blog slashdot = new Blog { Title = "Slashdot" };
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
    }
}
