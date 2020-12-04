using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.RssFeedItems.Queries
{
    public class RssFeedItemDetailsDto: RssFeedItemDto
    {
        public RssFeedItemDetailsDto()
        {
            FeedItemUserTags = new List<FeedItemUserTagDto>();
        }
        public string Content { get; set; }

        public string Description { get; set; }

        public IList<FeedItemUserTagDto> FeedItemUserTags { get; set; }

        public override void Mapping(Profile profile)
        {
            profile.CreateMap<RssFeedItem, RssFeedItemDetailsDto>()
                .ForMember(item => item.BlogTitle, config => config.Ignore());
        }

    }
    
}
