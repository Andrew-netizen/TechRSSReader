using Shouldly;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Commands.DeleteBlog;
using TechRSSReader.Application.UnitTests.Common;
using Xunit;

namespace TechRSSReader.Application.UnitTests.Blogs.Commands.DeleteBlog
{
    public class DeleteBlogCommandTests: CommandTestBase 
    {
        [Fact]
        public async Task Handle_GivenValidId_ShouldRemovePersistedTodoItem()
        {
            var command = new DeleteBlogCommand
            {
                Id = 1
            };

            var handler = new DeleteBlogCommand.DeleteBlogCommandHandler(Context);

            int result = await handler.Handle(command, CancellationToken.None);

            result.ShouldBe(command.Id);

            var entity = Context.Blogs.Find(command.Id);

            entity.ShouldBeNull();
        }


    }
}
