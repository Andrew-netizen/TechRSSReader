using AutoMapper;
using CodeHollow.FeedReader;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Infrastructure.FeedReader.Maps
{
    public class RssFeedItemMap: Profile
    {
        public RssFeedItemMap()
        {
            CreateMap<FeedItem, RssFeedItem>()
                .ForMember(dest => dest.RssId, source => source.MapFrom(s => s.Id))
                .ForMember(dest => dest.Id, opt => opt.MapFrom<CustomIdResolver>())
                .ForMember(dest => dest.Categories, opt => opt.MapFrom<CustomCategoryResolver>());
        }
    }
}
