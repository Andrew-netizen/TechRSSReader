using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Commands.CreateBlog;
using TechRSSReader.Application.Blogs.Commands.DeleteBlog;
using TechRSSReader.Application.Blogs.Commands.RetrieveFeedItems;
using TechRSSReader.Application.Blogs.Commands.UpdateBlog;
using TechRSSReader.Application.Blogs.Notifications;
using TechRSSReader.Application.Blogs.Queries.GetBlogs;
using TechRSSReader.Application.Blogs.Queries.GetBlogWithItems;

namespace TechRSSReader.WebUI.Controllers
{

    [Authorize]
    public class BlogsController: ApiController
    {

        private readonly ILogger<BlogsController> _logger;
        public BlogsController(ILogger<BlogsController> logger)
        {
            _logger = logger;

        }

        /// <summary>
        /// Get the list of Blogs that the user has created
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<BlogsViewModel>> Get()
        {
            return await Mediator.Send(new GetBlogsQuery());
        }

        /// GET: api/Blogs/5
        /// <summary>
        /// Get a blog with its associated articles.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<BlogDetailsDto> Get(int id)
        {
            BlogDetailsDto blogDto;
            try
            {
                blogDto = await Mediator.Send(new GetBlogWithItemsQuery { Id = id });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to Get Blog with Items");
                throw; 
            }

            return blogDto; 
        }

        /// POST: api/Blogs
        /// <summary>
        /// Create a new Blog 
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<BlogDto> Create(CreateBlogCommand command)
        {
            return await Mediator.Send(command);
        }


        /// DELETE: api/Blogs/5
        /// <summary>
        /// Delete a blog
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<int> Delete(int id)
        {
            int result = await Mediator.Send(new DeleteBlogCommand { Id = id });

            if (result == id)
                return id;
            else
                return 0;
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
            BlogDto result = await Mediator.Send(command);
            await Mediator.Publish(new BlogUpdatedNotification { BlogId = id });

            return result; 

        }
    }
}
