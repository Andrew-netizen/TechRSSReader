using Microsoft.Extensions.Logging;
using Moq;
using Shouldly;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Commands.UpdateBlog;
using TechRSSReader.Application.Blogs.Notifications;
using TechRSSReader.Application.UnitTests.Common;
using TechRSSReader.Domain.Entities;
using Xunit;

namespace TechRSSReader.Application.UnitTests.Blogs.Notifications
{
    public class BlogUpdatedNotificationsTests: CommandTestBase
    {
        [Fact]
        public async Task Handle_Valid()
        {
            // Check to see that if a user has updated a blog, then the
            // Update FeedItemExclusions command will set the Keyword Exclusions
            // flag as necessary

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

            // Now run the update Exclusions command.

            var input = new BlogUpdatedNotification
            {
                BlogId = 1,
            };


            var loggerMock = new Mock<ILogger<BlogUpdatedHandler>>();
            var target = new BlogUpdatedHandler(Context, loggerMock.Object);
            await target.Handle(input, CancellationToken.None);

            // The flag "ExcludedByKeyword" should have been updated.
            // THere are no exclusion keywords in the updated blog.
            // So, no feed items should be marked as excluded. 

            einsteinsExcludedFeedItems = Context.RssFeedItems.
                    Where(item => item.BlogId == 1)
                    .Where(item => (item.ExcludedByKeyword.HasValue && item.ExcludedByKeyword.Value)).Count();

            einsteinsExcludedFeedItems.ShouldBe(0);

            Blog blog = Context.Blogs.Where(blog => blog.Id == 1).FirstOrDefault();

            blog.UnreadUnexcludedItems.HasValue.ShouldBeTrue();
            blog.UnreadUnexcludedItems.Value.ShouldBe(2);
        }
    }
}
