using System;
using TechRSSReader.Application.Common.Mappings;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.WeeklyBlogSummaries.Queries
{
    public class WeeklyBlogSummaryDto: IMapFrom<WeeklyBlogSummary>
    {
        public int Id { get; set; }

        public int BlogId { get; set; }

        public int ItemsExcluded { get; set; }

        public int ItemsRatedAtLeastThree { get; set; }

        public int ItemsRead { get; set; }

        public int NewItems { get; set; }

        public DateTime WeekBegins { get; set; }
    }
}
