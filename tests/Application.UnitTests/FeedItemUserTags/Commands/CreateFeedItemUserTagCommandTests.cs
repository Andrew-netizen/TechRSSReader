using Microsoft.EntityFrameworkCore;
using Shouldly;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.FeedItemUserTags.Commands.CreateFeedItemUserTag;
using TechRSSReader.Application.RssFeedItems.Queries;
using TechRSSReader.Application.UnitTests.Common;
using Xunit;

namespace TechRSSReader.Application.UnitTests.FeedItemUserTags.Commands
{
    public class CreateFeedItemUserTagCommandTests : CommandTestBase
    {
        [Fact]
        public async Task Handle_Valid()
        {
            var command = new CreateFeedItemUserTagCommand
            {
                RssFeedItemId = 3,
                UserTagId = 2
            };

            var handler = new CreateFeedItemUserTagCommand.CreateFeedItemUserTagCommandHandler(Context, Mapper, CurrentUserService);

            FeedItemUserTagDto output = await handler.Handle(command, CancellationToken.None);

            var entity = await Context.FeedItemUserTags
                            .Include(item => item.UserTag)
                            .Where(item => item.RssFeedItemId == command.RssFeedItemId)
                            .Where(item => item.UserTagId == command.UserTagId)
                            .FirstOrDefaultAsync(CancellationToken.None);

            entity.ShouldNotBeNull();
            entity.RssFeedItemId.ShouldBe(command.RssFeedItemId);
            entity.UserTagId.ShouldBe(command.UserTagId);
            output.UserTagText.ShouldBe(entity.UserTag.Text);

        }
    }
}
