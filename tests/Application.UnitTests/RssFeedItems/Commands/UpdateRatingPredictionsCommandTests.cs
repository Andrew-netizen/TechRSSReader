using Shouldly;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.RssFeedItems.Commands.UpdateRatingPredictions;
using TechRSSReader.Application.UnitTests.Common;
using Xunit;

namespace TechRSSReader.Application.UnitTests.RssFeedItems.Commands
{
    public class UpdateRatingPredictionsCommandTests : CommandTestBase
    {
        [Fact]
        public async Task Handle_Valid()
        {
            var command = new UpdateRatingPredictionsCommand();

            var handler = new UpdateRatingPredictionsCommand.UpdateRatingPredictionsCommandHandler(
                    Context, Mapper, UserInterestPredictor);

            await handler.Handle(command, CancellationToken.None);

            var rssFeedItem = Context.RssFeedItems.Find(1);

            rssFeedItem.UserRatingPrediction.HasValue.ShouldBeTrue();
            rssFeedItem.UserRatingPrediction.Value.ShouldBe(1.5F);
        }
    }
}
