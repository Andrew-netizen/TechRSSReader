using Microsoft.EntityFrameworkCore.ChangeTracking;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.RssFeedItems.Commands.UpdateFeedItem;
using TechRSSReader.Application.RssFeedItems.Queries;
using TechRSSReader.Application.UnitTests.Common;
using Xunit;

namespace TechRSSReader.Application.UnitTests.RssFeedItems.Commands
{
    public class UpdateFeedItemCommandTests : CommandTestBase
    {

        [Fact]
        public async Task Handle_Valid()
        {

            var command = new UpdateFeedItemCommand
            {

                Id = 1,
                ReadAlready = false,
                UserRating = 3 
            };

            var handler = new UpdateFeedItemCommand.UpdateFeedItemCommandHandler(Context, Mapper, UserInterestPredictor, CurrentUserService);


            RssFeedItemDto result = await handler.Handle(command, CancellationToken.None);
            result.UserRatingPrediction.HasValue.ShouldBeTrue();
            result.BlogTitle.ShouldNotBeNullOrWhiteSpace();

            var rssFeedItem = Context.RssFeedItems.Find(command.Id);

            rssFeedItem.Id.ShouldBe(command.Id);
            rssFeedItem.ReadAlready.ShouldBe(command.ReadAlready);
            rssFeedItem.UserRating.ShouldBe(command.UserRating);
            

        }
    }
}
