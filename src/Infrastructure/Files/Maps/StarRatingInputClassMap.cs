using TechRSSReader.Domain.Entities;
using CsvHelper.Configuration;
using System.Globalization;

namespace TechRSSReader.Infrastructure.Files.Maps
{
    public class StarRatingInputClassMap: ClassMap<RssFeedItem>
    {
        public StarRatingInputClassMap()
        {
            AutoMap(CultureInfo.CurrentCulture);
        }

    }
}
