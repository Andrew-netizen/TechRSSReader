using AutoMapper;
using System;
using TechRSSReader.Application.Common.Mappings;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.RssFeedItems.Queries
{
    public class RssFeedItemDto: IMapFrom<RssFeedItem>
    {
        public int Id { get; set; }

        public string Author { get; set; }

        public int BlogId { get; set; }

        public string BlogTitle { get; set; }

        public bool Bookmarked { get; set; }

        public string Categories { get; set; }
        
        public bool? ExcludedByKeyword { get; set; }

        public string Link { get; set; }

        public DateTime? PublishingDate { get; set; }

        public string PublishingDateString { get; set; }

        public bool ReadAlready { get; set; }

        public DateTime RetrievedDateTime { get; set; }

        public string RssId { get; set; }

        public string Title { get; set; }

        public int? UserRating { get; set; }

        public Single? UserRatingPrediction { get; set; }

        public virtual void Mapping(Profile profile)
        {
            profile.CreateMap<RssFeedItem, RssFeedItemDto>()
                .ForMember(item => item.BlogTitle, config => config.Ignore());
                
        }
    }
}
