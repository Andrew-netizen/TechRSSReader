using TechRSSReader.Application.Common.Mappings;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.UserTags.Queries.GetUserTags
{
    public class FeedItemUserTagDto: IMapFrom<FeedItemUserTag>
    {
        public int RssFeedItemId { get; set; }

        public int UserTagId { get; set; }

        

    }
}
