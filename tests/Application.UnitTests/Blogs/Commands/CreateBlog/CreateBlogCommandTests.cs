using Shouldly;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Commands.CreateBlog;
using TechRSSReader.Application.Blogs.Queries.GetBlogs;
using TechRSSReader.Application.UnitTests.Common;
using Xunit;

namespace TechRSSReader.Application.UnitTests.Blogs.Commands.CreateBlog
{
    public class CreateBlogCommandTests: CommandTestBase
    {
        [Fact]
        public async Task Handle_Valid()
        {
            var command = new CreateBlogCommand
            {

                Id = 0,
                Title = "Feynmann's Blog",
                XmlAddress = "http://www.feynmann.org.au",
                KeywordsToExclude = new List<KeywordToExcludeDto>
                {
                    new KeywordToExcludeDto
                    {
                        BlogId = 0,
                        Keyword = "Holidays"
                    }
                },
                KeywordsToInclude = new List<KeywordToIncludeDto>
                {
                    new KeywordToIncludeDto
                    {
                        BlogId = 0, 
                        Keyword = "Physics"
                    }
                }
            };

            var handler = new CreateBlogCommand.CreateBlogCommandHandler(Context, Mapper, CurrentUserService);

            BlogDto output = await handler.Handle(command, CancellationToken.None);

            output.Id.ShouldBeGreaterThan(0);

            var entity = Context.Blogs.Find(output.Id);

            entity.ShouldNotBeNull();
            entity.Title.ShouldBe(command.Title);
            entity.XmlAddress.ShouldBe(command.XmlAddress);
            entity.KeywordsToExclude.Count.ShouldBe(1);
            entity.KeywordsToInclude.Count.ShouldBe(1);
        }

    }
}
