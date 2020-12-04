using TechRSSReader.Application.Common.Mappings;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.RssFeedItems.Queries
{
    public class FeedItemUserTagDto: IMapFrom<FeedItemUserTag>
    {
        public int UserTagId { get; set; }

        public int RssFeedItemId { get; set; }

        public string UserTagText { get; set; }
    }
}
