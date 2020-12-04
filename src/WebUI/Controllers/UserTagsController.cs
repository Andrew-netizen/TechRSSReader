using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TechRSSReader.Application.UserTags.Commands.CreateUserTag;
using TechRSSReader.Application.UserTags.Queries.GetUserTags;

namespace TechRSSReader.WebUI.Controllers
{
    [Authorize]
    public class UserTagsController: ApiController
    {
        /// <summary>
        /// Get the list of tags that the user has created
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<UserTagsViewModel> Get()
        {
            return await Mediator.Send(new GetUserTagsQuery());
        }

        /// POST: api/UserTags
        /// <summary>
        /// Create a new User Tag 
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<UserTagDto> Create(CreateUserTagCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}
