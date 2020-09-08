using AutoMapper;
using CodeHollow.FeedReader;
using System;
using System.Collections.Generic;
using System.Text;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Infrastructure.FeedReader.Maps
{
    public class RssFeedItemMap: Profile
    {
        public RssFeedItemMap()
        {
            CreateMap<FeedItem, RssFeedItem>()
                .ForMember(dest => dest.RssId, source => source.MapFrom(s => s.Id))
                .ForMember(dest => dest.Id, opt => opt.MapFrom<CustomIdResolver>());
        }
    }
}
