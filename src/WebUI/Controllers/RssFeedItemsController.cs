using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Exceptions;
using TechRSSReader.Application.RssFeedItems.Commands.UpdateUserInterested;
using TechRSSReader.Application.RssFeedItems.Queries;

namespace TechRSSReader.WebUI.Controllers
{

    [Authorize]
    public class RssFeedItemsController: ApiController
    {
        [HttpGet("[action]")]
        public async Task<RssFeedItemDto> GetNoUserPreference(int blogId)
        {
            return await Mediator.Send(new GetNoUserPreferenceQuery { BlogId = blogId});
            
        }

        /// PUT: api/RssFeedItems/5
        /// <summary>
        /// Update the user interested flag on an RSS Feed Item
        /// </summary>
        /// <param name="id"></param>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<RssFeedItemDto> UpdateUserInterested(int id, UpdateUserInterestedCommand command)
        {
            RssFeedItemDto response = null;

            if (id != command.Id)
            {
                throw new NotFoundException(typeof(RssFeedItemDto).ToString(), id);
            }

            bool success = await Mediator.Send(command);

            if (success)
            {
                GetRssFeedItemQuery query = new GetRssFeedItemQuery { Id = command.Id };
                RssFeedItemDto updatedItem = await Mediator.Send(query);
                if (updatedItem != null)
                {
                    response =
                        await Mediator.Send(new GetNoUserPreferenceQuery { BlogId = updatedItem.BlogId });
                }

            }

            return response; 
        }
    }
}
