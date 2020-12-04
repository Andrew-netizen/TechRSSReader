using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using TechRSSReader.Application.RssFeedItems.Commands.UpdateFeedItem;
using TechRSSReader.Application.RssFeedItems.Queries;

namespace TechRSSReader.WebUI.Controllers
{

    [Authorize]
    public class RssFeedItemsController: ApiController
    {

        [Route("bookmarked")]
        public async Task<FeedItemsViewModel> GetBookmarked()
        {
            return await Mediator.Send(new GetBookmarkedItemsQuery());

        }

        [Route("topRated")]
        public async Task<FeedItemsViewModel> GetTopRated()
        {
            return await Mediator.Send(new GetTopRatedFeedItemsQuery());
        }


        [Route("unread")]
        public async Task<FeedItemsViewModel> GetUnread()
        {
            return await Mediator.Send(new GetUnreadItemsQuery());

        }

        [Route("usertag/{id}")]
        public async Task<FeedItemsViewModel> GetTagged(int id)
        {
            return await Mediator.Send(new GetTaggedFeedItemsQuery { UserTagId = id });

        }

        [HttpGet("{id}")]
        public async Task<RssFeedItemDetailsDto> GetFeedItemDetails(int id)
        {
            return await Mediator.Send(new GetFeedItemDetailsQuery{ Id = id });
        }

        /// PUT: api/RssFeedItems/5
        /// <summary>
        /// Update the user interested flag on an RSS Feed Item
        /// </summary>
        /// <param name="id"></param>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<RssFeedItemDto> Update(int id, UpdateFeedItemCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}
