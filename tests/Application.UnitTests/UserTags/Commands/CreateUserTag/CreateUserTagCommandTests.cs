using Shouldly;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.UnitTests.Common;
using TechRSSReader.Application.UserTags.Commands.CreateUserTag;
using TechRSSReader.Application.UserTags.Queries.GetUserTags;
using Xunit;

namespace TechRSSReader.Application.UnitTests.UserTags.Commands.CreateUserTag
{
    public class CreateUserTagCommandTests : CommandTestBase
    {
        [Fact]
        public async Task Handle_Valid()
        {
            var command = new CreateUserTagCommand
            {

                Id = 0,
                Text = "Bootstrap"
            };

            var handler = new CreateUserTagCommand.CreateUserTagCommandHandler(Context, Mapper, CurrentUserService);

            UserTagDto output = await handler.Handle(command, CancellationToken.None);

            output.Id.ShouldBeGreaterThan(0);

            var entity = Context.UserTags.Find(output.Id);

            entity.ShouldNotBeNull();
            entity.Text.ShouldBe(command.Text);
        }
    }
}
