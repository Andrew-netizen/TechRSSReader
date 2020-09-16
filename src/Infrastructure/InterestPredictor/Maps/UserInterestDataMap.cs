using AutoMapper;
using TechRSSReader.Domain.Entities;
using TechRSSReaderML.Model;

namespace TechRSSReader.Infrastructure.InterestPredictor.Maps
{
    public class UserInterestInputMap: Profile
    {
        public UserInterestInputMap()
        {
            CreateMap<RssFeedItem, UserInterestInput>();
        }
    }
}
