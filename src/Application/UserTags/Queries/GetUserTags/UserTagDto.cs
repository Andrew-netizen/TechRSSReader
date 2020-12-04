using TechRSSReader.Application.Common.Mappings;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.UserTags.Queries.GetUserTags
{
    public class UserTagDto: IMapFrom<UserTag>
    {
        public int Id { get; set; }

        public string Text { get; set; }
    }
}
