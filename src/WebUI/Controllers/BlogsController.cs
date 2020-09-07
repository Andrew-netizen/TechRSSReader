using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Queries.GetBlogs;

namespace TechRSSReader.WebUI.Controllers
{

    [Authorize]
    public class BlogsController: ApiController
    {

        [HttpGet]
        public async Task<ActionResult<BlogsViewModel>> Get()
        {
            return await Mediator.Send(new GetBlogsQuery());
        }
    }
}
