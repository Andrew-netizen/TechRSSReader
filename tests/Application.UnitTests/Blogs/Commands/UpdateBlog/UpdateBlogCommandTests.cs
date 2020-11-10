using Shouldly;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Commands.UpdateBlog;
using TechRSSReader.Application.UnitTests.Common;
using Xunit;
using Xunit.Abstractions;

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

            int einsteinsExcludedFeedItems = Context.RssFeedItems.
                    Where(item => item.BlogId == 1)
                    .Where(item => (item.ExcludedByKeyword.HasValue && item.ExcludedByKeyword.Value)).Count();

            einsteinsExcludedFeedItems.ShouldBe(1);

            var handler = new UpdateBlogCommand.UpdateBlogCommandHandler(Context, Mapper, CurrentUserService);

            await handler.Handle(command, CancellationToken.None);

            var entity = Context.Blogs.Find(command.Id);

            entity.ShouldNotBeNull();
            entity.Title.ShouldBe(command.Title);
            entity.XmlAddress.ShouldBe(command.XmlAddress);
            entity.KeywordsToExclude.Count.ShouldBe(0);
            entity.KeywordsToInclude.Count.ShouldBe(0);

            // Once the blog is updated, the flag "ExcludedByKeyword" needs to be updated on all associated feed items.

            einsteinsExcludedFeedItems = Context.RssFeedItems.
                    Where(item => item.BlogId == 1)
                    .Where(item => (item.ExcludedByKeyword.HasValue && item.ExcludedByKeyword.Value)).Count();

            einsteinsExcludedFeedItems.ShouldBe(0);
        }

    }
}
