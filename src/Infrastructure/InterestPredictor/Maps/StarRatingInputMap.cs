using AutoMapper;
using TechRSSReader.Domain.Entities;
using TechRSSReaderML.Model;

namespace TechRSSReader.Infrastructure.InterestPredictor.Maps
{
    public class StarRatingInputMap: Profile
    {
        public StarRatingInputMap()
        {
            CreateMap<RssFeedItem, StarRatingInput>();
        }
    }
}
