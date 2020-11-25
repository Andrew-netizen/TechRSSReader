using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechRSSReader.Domain.Entities;

namespace Domain.UnitTests.Entities
{
    public class RssFeedItemFactory
    {
       

        public static RssFeedItem ItemCreatedThisWeek()
        {
            return new RssFeedItem
            {
                Created = DateTime.Now.AddDays(-2)
            };
        }

        public static RssFeedItem ItemCreatedLastYear()
        {
            return new RssFeedItem
            {
                Created = DateTime.Now.AddDays(-365)
            };
        }

        public static RssFeedItem ItemCreatedTomorrow()
        {
            return new RssFeedItem
            {
                Created = DateTime.Now.AddDays(1)
            };
        }

        public static RssFeedItem ItemExcludedThisWeek()
        {
            return new RssFeedItem
            {
                Created = DateTime.Now.AddDays(-2),
                ExcludedByKeyword = true
            };
        }

        public static RssFeedItem ItemExcludedLastYear()
        {
            return new RssFeedItem
            {
                Created = DateTime.Now.AddDays(-365),
                ExcludedByKeyword = true
            };
        }

        public static RssFeedItem ItemExcludedTomorrow()
        {
            return new RssFeedItem
            {
                Created = DateTime.Now.AddDays(1),
                ExcludedByKeyword = true
            };
        }

        public static RssFeedItem ItemReadThisWeek()
        {
            return new RssFeedItem
            {
                UserReadDate = DateTime.Now.AddDays(-2)
            };
        }

        public static RssFeedItem ItemReadLastYear()
        {
            return new RssFeedItem
            {
                UserReadDate = DateTime.Now.AddDays(-365)
            };
        }

        public static RssFeedItem ItemReadTomorrow()
        {
            return new RssFeedItem
            {
                UserReadDate = DateTime.Now.AddDays(1)
            };
        }

        public static RssFeedItem ItemRatedThisWeek(int rating)
        {
            return new RssFeedItem
            {
                UserRatedDate = DateTime.Now.AddDays(-2),
                UserRating = rating
            };
        }

        public static RssFeedItem ItemRatedLastYear(int rating)
        {
            return new RssFeedItem
            {
                UserRatedDate = DateTime.Now.AddDays(-365),
                UserRating = rating
            };
        }

        public static RssFeedItem ItemRatedTomorrow(int rating)
        {
            return new RssFeedItem
            {
                UserRatedDate = DateTime.Now.AddDays(1),
                UserRating = rating
            };
        }


    }
}
