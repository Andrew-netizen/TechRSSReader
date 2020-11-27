using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TechRSSReader.Application.WeeklyBlogSummaries.Queries;

namespace TechRSSReader.WebUI.Controllers
{

    [Authorize]
    public class WeeklyBlogSummariesController: ApiController
    {

        /// GET: api/WeeklyBlogSummaries
        /// <summary>
        /// Get the latest weekly blog summaries for each blog.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<WeeklyBlogSummaryViewModel> GetAllBlogsLatest()
        {
            
            return await Mediator.Send(new GetAllBlogSummariesForWeekQuery());
        }

        /// GET: api/WeeklyBlogSummaries/5
        /// <summary>
        /// Get the 5 latest Weekly Blog Summaries.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<WeeklyBlogSummaryViewModel> GetLatest(int id)
        {
            return await Mediator.Send(new GetLatestSummariesQuery{ BlogId = id });
        }

    }
}
