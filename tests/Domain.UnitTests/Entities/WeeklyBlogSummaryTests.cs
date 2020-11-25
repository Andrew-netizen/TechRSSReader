using Shouldly;
using System;
using System.Collections.Generic;
using TechRSSReader.Domain.Entities;
using Xunit;

namespace Domain.UnitTests.Entities
{
    public class WeeklyBlogSummaryTests
    {
        private readonly DateTime OneWeekAgo = DateTime.Now.AddDays(-7);
        private readonly int BlogId = 3; 
        
        [Fact]
        public void NewItems()
        {
            List<RssFeedItem> input = new List<RssFeedItem>
            {
                RssFeedItemFactory.ItemCreatedThisWeek()
            };
            WeeklyBlogSummary target = new WeeklyBlogSummary(BlogId, input, OneWeekAgo);
            target.NewItems.ShouldBe(1);
            
        }

        [Fact]
        public void NewItemsExcludeOld()
        {
            List<RssFeedItem> input = new List<RssFeedItem>
            {
                RssFeedItemFactory.ItemCreatedThisWeek(),
                RssFeedItemFactory.ItemCreatedLastYear()
            };
            WeeklyBlogSummary target = new WeeklyBlogSummary(BlogId, input, OneWeekAgo);
            target.NewItems.ShouldBe(1);

        }

        [Fact]
        public void NewItemsExcludeFuture()
        {
            List<RssFeedItem> input = new List<RssFeedItem>
            {
                RssFeedItemFactory.ItemCreatedThisWeek(),
                RssFeedItemFactory.ItemCreatedTomorrow()
            };
            WeeklyBlogSummary target = new WeeklyBlogSummary(BlogId, input, OneWeekAgo);
            target.NewItems.ShouldBe(1);
        }

        [Fact]
        public void SetBlogId()
        {
            List<RssFeedItem> input = new List<RssFeedItem>();
            
            WeeklyBlogSummary target = new WeeklyBlogSummary(BlogId, input, OneWeekAgo);
            target.BlogId.ShouldBe(BlogId);
        }

        [Fact]
        public void ItemsRead()
        {
            List<RssFeedItem> input = new List<RssFeedItem>
            {
                RssFeedItemFactory.ItemReadThisWeek()
            };
            WeeklyBlogSummary target = new WeeklyBlogSummary(BlogId, input, OneWeekAgo);
            target.ItemsRead.ShouldBe(1);
        }

        [Fact]
        public void ItemsReadExcludeOld()
        {
            List<RssFeedItem> input = new List<RssFeedItem>
            {
                RssFeedItemFactory.ItemReadThisWeek(),
                RssFeedItemFactory.ItemReadLastYear()
            };
            WeeklyBlogSummary target = new WeeklyBlogSummary(BlogId, input, OneWeekAgo);
            target.ItemsRead.ShouldBe(1);

        }

        [Fact]
        public void ItemsReadExcludeFuture()
        {
            List<RssFeedItem> input = new List<RssFeedItem>
            {
                RssFeedItemFactory.ItemReadThisWeek(),
                RssFeedItemFactory.ItemReadTomorrow()
            };
            WeeklyBlogSummary target = new WeeklyBlogSummary(BlogId, input, OneWeekAgo);
            target.ItemsRead.ShouldBe(1);

        }

        [Fact]
        public void ItemsRatedAtLeastThree()
        {
            List<RssFeedItem> input = new List<RssFeedItem>
            {
                RssFeedItemFactory.ItemRatedThisWeek(1),
                RssFeedItemFactory.ItemRatedThisWeek(2),
                RssFeedItemFactory.ItemRatedThisWeek(3), 
                RssFeedItemFactory.ItemRatedThisWeek(4),
                RssFeedItemFactory.ItemRatedThisWeek(5)
            };
            WeeklyBlogSummary target = new WeeklyBlogSummary(BlogId, input, OneWeekAgo);
            target.ItemsRatedAtLeastThree.ShouldBe(3);

        }

        [Fact]
        public void ItemsRatedAtLeastThreeExcludeOld()
        {
            List<RssFeedItem> input = new List<RssFeedItem>
            {
                RssFeedItemFactory.ItemRatedThisWeek(3),
                RssFeedItemFactory.ItemRatedLastYear(3)
            };
            WeeklyBlogSummary target = new WeeklyBlogSummary(BlogId, input, OneWeekAgo);
            target.ItemsRatedAtLeastThree.ShouldBe(1);

        }

        [Fact]
        public void ItemsRatedAtLeastThreeExcludeFuture()
        {
            List<RssFeedItem> input = new List<RssFeedItem>
            {
                RssFeedItemFactory.ItemRatedThisWeek(3),
                RssFeedItemFactory.ItemRatedTomorrow(3)
            };
            WeeklyBlogSummary target = new WeeklyBlogSummary(BlogId, input, OneWeekAgo);
            target.ItemsRatedAtLeastThree.ShouldBe(1);

        }

        [Fact]
        public void ItemsExcluded()
        {
            List<RssFeedItem> input = new List<RssFeedItem>
            {
                RssFeedItemFactory.ItemExcludedThisWeek()
            };
            WeeklyBlogSummary target = new WeeklyBlogSummary(BlogId, input, OneWeekAgo);
            target.ItemsExcluded.ShouldBe(1);
        }

        [Fact]
        public void ItemsExcludedNotLastYear()
        {
            List<RssFeedItem> input = new List<RssFeedItem>
            {
                RssFeedItemFactory.ItemExcludedThisWeek(),
                RssFeedItemFactory.ItemExcludedLastYear()
            };
            WeeklyBlogSummary target = new WeeklyBlogSummary(BlogId, input, OneWeekAgo);
            target.ItemsExcluded.ShouldBe(1);
        }

        [Fact]
        public void ItemsExcludedNotTomorrow()
        {
            List<RssFeedItem> input = new List<RssFeedItem>
            {
                RssFeedItemFactory.ItemExcludedThisWeek(),
                RssFeedItemFactory.ItemExcludedTomorrow()
            };
            WeeklyBlogSummary target = new WeeklyBlogSummary(BlogId, input, OneWeekAgo);
            target.ItemsExcluded.ShouldBe(1);
        }

        [Fact]
        public void WeekBegins()
        {
            List<RssFeedItem> input = new List<RssFeedItem>
            {
                RssFeedItemFactory.ItemExcludedThisWeek(),
                RssFeedItemFactory.ItemExcludedTomorrow()
            };
            WeeklyBlogSummary target = new WeeklyBlogSummary(BlogId, input, OneWeekAgo);
            target.WeekBegins.Hour.ShouldBe(0);
            target.WeekBegins.Minute.ShouldBe(0);
            target.WeekBegins.Second.ShouldBe(0);
            target.WeekBegins.Day.ShouldBe(OneWeekAgo.Day);
            target.WeekBegins.Month.ShouldBe(OneWeekAgo.Month);
            target.WeekBegins.Year.ShouldBe(OneWeekAgo.Year);
        }



    }
}
