using Shouldly;
using System;
using TechRSSReader.Domain.Entities;
using TechRSSReader.Domain.ValueObjects;
using Xunit;

namespace Domain.UnitTests.Entities
{
    
    public class RssFeedItemTests
    {
        [Fact]
        public void ReturnsFalseNoExcludedKeywords()
        {
            Blog blog = new Blog();
            RssFeedItem target = new RssFeedItem();
            bool result = target.ContainsExcludedKeywords(blog);

            result.ShouldBeFalse();
        }

        [Fact]
        public void ReturnsTrueExcludedKeywords()
        {
            Blog blog = new Blog();
            KeywordToExclude space = new KeywordToExclude();
            space.Keyword = "space";
            blog.KeywordsToExclude.Add(space);
            RssFeedItem target = new RssFeedItem();
            target.Categories = "space";
            bool result = target.ContainsExcludedKeywords(blog);

            result.ShouldBeTrue();
        }

        [Fact]
        public void ReturnsFalseNoCPlusPlus()
        {
            Blog blog = new Blog();
            KeywordToExclude space = new KeywordToExclude();
            space.Keyword = "C++";
            blog.KeywordsToExclude.Add(space);
            RssFeedItem target = new RssFeedItem();
            target.Categories = "CISALONGWORD";
            bool result = target.ContainsExcludedKeywords(blog);

            result.ShouldBeFalse();
        }

        [Fact]
        public void UserRatedDate()
        {
         
            RssFeedItem target = new RssFeedItem();
            target.UserRating = 1;
            DateTime timeNow = DateTime.Now;
            DateTime? result = target.UserRatedDate;
            result.HasValue.ShouldBeTrue();
            TimeSpan timeSpan = timeNow - result.Value;
            Math.Abs(timeSpan.TotalSeconds).ShouldBeLessThan(1);
            
            
        }

        [Fact]
        public void UserReadDate()
        {

            RssFeedItem target = new RssFeedItem();
            target.ReadAlready = true; 
            DateTime timeNow = DateTime.Now;
            DateTime? result = target.UserReadDate;
            result.HasValue.ShouldBeTrue();
            TimeSpan timeSpan = timeNow - result.Value;
            Math.Abs(timeSpan.TotalSeconds).ShouldBeLessThan(1);


        }
    }
}
