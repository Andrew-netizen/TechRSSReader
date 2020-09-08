using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Commands.RetrieveFeedItems;
using TechRSSReader.Application.Blogs.Commands.UpdateBlog;
using TechRSSReader.Application.Blogs.Queries.GetBlogs;

namespace TechRSSReader.WebUI.Controllers
{

    [Authorize]
    public class BlogsController: ApiController
    {

        /// <summary>
        /// Get the list of Blogs that the user has created
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<BlogsViewModel>> Get()
        {
            return await Mediator.Send(new GetBlogsQuery());
        }

        /// <summary>
        /// Retrieve RSS Feed Items for a given feed/blog, and store them 
        /// in the database. 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut("[action]")]
        public async Task<int> RetrieveFeedItemsFromSource (int id)
        {
            return await Mediator.Send(new RetrieveFeedItemsCommand { BlogId = id });
        }

        /// PUT: api/Blogs/5
        /// <summary>
        /// Update a blog
        /// </summary>
        /// <param name="id"></param>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<BlogDto> Update(int id, UpdateBlogCommand command)
        {
            return await Mediator.Send(command);
            
        }
    }
}
