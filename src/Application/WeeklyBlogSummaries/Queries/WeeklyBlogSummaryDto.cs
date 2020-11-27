using System;
using TechRSSReader.Application.Common.Mappings;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.WeeklyBlogSummaries.Queries
{
    public class WeeklyBlogSummaryDto: IMapFrom<WeeklyBlogSummary>
    {
        public int Id { get; set; }

        public int BlogId { get; set; }

        public string BlogTitle { get; set; }

        public int ItemsExcluded { get; set; }

        public int ItemsRatedAtLeastThree { get; set; }

        public int ItemsRead { get; set; }

        public int NewItems { get; set; }

        // Ideally this derived property should be on the Entity object, 
        // But dealing with persistence in an in memory database was too much 
        // hassle, so this derived property appears here instead.
        public int NewNotExcluded { 
            get
            {
                return NewItems - ItemsExcluded;
            }
        }

        public DateTime WeekBegins { get; set; }
    }
}
