using Microsoft.EntityFrameworkCore;
using Shouldly;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.FeedItemUserTags.Commands.DeleteFeedItemUserTag;
using TechRSSReader.Application.UnitTests.Common;
using Xunit;

namespace TechRSSReader.Application.UnitTests.FeedItemUserTags.Commands
{
    public class DeleteFeedItemUserTagCommandTest : CommandTestBase
    {
        [Fact]
        public async Task Handle_Valid()
        {
            var command = new DeleteFeedItemUserTagCommand
            {
                RssFeedItemId = 1,
                UserTagId = 1
            };

            var entity = await Context.FeedItemUserTags
                .Where(item => item.RssFeedItemId == command.RssFeedItemId)
                .Where(item => item.UserTagId == command.UserTagId)
                .FirstOrDefaultAsync(CancellationToken.None);

            entity.ShouldNotBeNull();

            var handler = new DeleteFeedItemUserTagCommand.DeleteFeedItemUserTagCommandHandler(Context, Mapper, CurrentUserService);

            await handler.Handle(command, CancellationToken.None);

            entity = await Context.FeedItemUserTags
                .Where(item => item.RssFeedItemId == command.RssFeedItemId)
                .Where(item => item.UserTagId == command.UserTagId)
                .FirstOrDefaultAsync(CancellationToken.None);

            entity.ShouldBeNull();

        }
    }
}
