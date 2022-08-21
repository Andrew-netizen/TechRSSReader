using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using TechRSSReader.Domain.Common;
using TechRSSReader.Domain.ValueObjects;

namespace TechRSSReader.Domain.Entities
{
    public class RssFeedItem: AuditableEntity
    {
        private bool _readAlready; 
        private int? _userRating; 

        public int Id { get; set; }
        
        public string? Author { get; set; }

        public int BlogId { get; set; }

        public virtual Blog Blog { get; set; }

        public bool Bookmarked { get; set; }

        public string Categories { get; set; }

        public string? Content { get; set; }

        public string? Description { get; set; }

        public bool? ExcludedByKeyword { get; set; }

        public string? Link { get; set; }

        public DateTime?  PublishingDate { get; set; }

        public string? PublishingDateString { get; set; }

        public bool ReadAlready { 
            get
            {
                return _readAlready;
            }
            set
            {
                if ((!UserReadDate.HasValue) && (!_readAlready) && (value))
                    this.UserReadDate = DateTime.Now;
                _readAlready = value;
            }
        }

        public DateTime RetrievedDateTime { get; set; }

        public string? RssId { get; set; }

        public string Title { get; set; }
                
        public DateTime? UserRatedDate { get; set; }

        public int? UserRating { 
            get
            {
                return _userRating;
            }
            set
            {
                if ((!UserRatedDate.HasValue) && (!_userRating.HasValue) && (value.HasValue))
                    this.UserRatedDate = DateTime.Now;
                _userRating = value;
            }
        }

        public virtual IList<FeedItemUserTag> FeedItemUserTags { get; set; }

        public Single? UserRatingPrediction { get; set; }

        public DateTime? UserReadDate { get; set; }

        public bool ContainsExcludedKeywords(Blog blog)
        {
            foreach (KeywordToExclude keyword in blog.KeywordsToExclude)
            {
                if (this.Categories.Contains(keyword.Keyword, StringComparison.OrdinalIgnoreCase))
                    return true;
            }
            return false;
        }


    }
}
