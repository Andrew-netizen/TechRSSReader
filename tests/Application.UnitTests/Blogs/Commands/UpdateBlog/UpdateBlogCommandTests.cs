using Shouldly;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Commands.UpdateBlog;
using TechRSSReader.Application.UnitTests.Common;
using Xunit;

namespace TechRSSReader.Application.UnitTests.Blogs.Commands.UpdateBlog
{
    public class UpdateBlogCommandTests: CommandTestBase
    {
        [Fact]
        public async Task Handle_Valid()
        {
            var command = new UpdateBlogCommand
            {
                
                Id = 1, 
                Title = "Einstein's Updated Blog",
                XmlAddress = "http://www.smh.com.au"
            };

            var handler = new UpdateBlogCommand.UpdateBlogCommandHandler(Context, Mapper, CurrentUserService);

            await handler.Handle(command, CancellationToken.None);

            var entity = Context.Blogs.Find(command.Id);

            entity.ShouldNotBeNull();
            entity.Title.ShouldBe(command.Title);
            entity.XmlAddress.ShouldBe(command.XmlAddress);
            entity.KeywordsToExclude.Count.ShouldBe(0);
            entity.KeywordsToInclude.Count.ShouldBe(0);
        }

    }
}
