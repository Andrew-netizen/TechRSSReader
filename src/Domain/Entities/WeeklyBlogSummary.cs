using System;
using System.Collections.Generic;
using System.Linq;
using TechRSSReader.Domain.Common;

namespace TechRSSReader.Domain.Entities
{
    public class WeeklyBlogSummary
    {
        public int Id { get; set; }

        public int BlogId { get; set; }

        public virtual Blog Blog { get; set; }

        public int ItemsExcluded { get; set; }

        public int ItemsRatedAtLeastThree { get; set; }

        public int NewItems { get; set; }

        public int NewNotExcluded { 
            get
            {
                return NewItems - ItemsExcluded;
            }
        }

        public int ItemsRead { get; set; }

        public DateTime WeekBegins { get; set; }

        public WeeklyBlogSummary(int blogId, List<RssFeedItem> feedItems, DateTime start)
        {
            BlogId = blogId;
            WeekBegins = new DateTime(start.Year, start.Month, start.Day);
            DateTime WeekEnds = start.AddDays(7);
            NewItems = feedItems
                .Where(item => item.Created.Subtract(WeekBegins).TotalSeconds > 0)
                .Where(item => item.Created.Subtract(WeekEnds).TotalSeconds < 0)
                .Count();

            ItemsRead = feedItems
                .Where(item => item.UserReadDate.HasValue)
                .Where(item => item.UserReadDate.Value.Subtract(WeekBegins).TotalSeconds > 0)
                .Where(item => item.UserReadDate.Value.Subtract(WeekEnds).TotalSeconds < 0)
                .Count();

            ItemsRatedAtLeastThree = feedItems
                .Where(item => item.UserRatedDate.HasValue)
                .Where(item => item.UserRatedDate.Value.Subtract(WeekBegins).TotalSeconds > 0)
                .Where(item => item.UserRatedDate.Value.Subtract(WeekEnds).TotalSeconds < 0)
                .Where(item => item.UserRating.HasValue)
                .Where(item => item.UserRating.Value >= 3)
                .Count();

            ItemsExcluded = feedItems
                .Where(item => item.ExcludedByKeyword.HasValue && item.ExcludedByKeyword.Value)
                .Where(item => item.Created.Subtract(WeekBegins).TotalSeconds > 0)
                 .Where(item => item.Created.Subtract(WeekEnds).TotalSeconds < 0)
                .Count();
        }

        public WeeklyBlogSummary()
        {
            // Need a default constructor with EF Core
        }
    }
}
