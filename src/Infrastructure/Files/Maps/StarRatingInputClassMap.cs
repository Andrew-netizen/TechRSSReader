using TechRSSReader.Domain.Entities;
using CsvHelper.Configuration;

namespace TechRSSReader.Infrastructure.Files.Maps
{
    public class StarRatingInputClassMap: ClassMap<RssFeedItem>
    {
        public StarRatingInputClassMap()
        {
            AutoMap();
        }

    }
}
