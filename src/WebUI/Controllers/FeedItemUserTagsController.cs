using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TechRSSReader.Application.FeedItemUserTags.Commands.CreateFeedItemUserTag;
using TechRSSReader.Application.RssFeedItems.Queries;

namespace TechRSSReader.WebUI.Controllers
{
    [Authorize]
    public class FeedItemUserTagsController: ApiController
    {

        /// POST: api/FeedItemUserTags
        /// <summary>
        /// Create a new FeedItemUserTag 
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<FeedItemUserTagDto> Create(CreateFeedItemUserTagCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}
