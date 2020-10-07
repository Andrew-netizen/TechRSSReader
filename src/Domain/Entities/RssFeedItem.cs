using System;
using TechRSSReader.Domain.Common;

namespace TechRSSReader.Domain.Entities
{
    public class RssFeedItem: AuditableEntity
    {

        public int Id { get; set; }
        
        public string Author { get; set; }

        public int BlogId { get; set; }

        public bool Bookmarked { get; set; }

        public string Categories { get; set; }

        public string Content { get; set; }

        public string Description { get; set; }

        public string Link { get; set; }

        public DateTime?  PublishingDate { get; set; }

        public string PublishingDateString { get; set; }

        public bool ReadAlready { get; set; }

        public DateTime RetrievedDateTime { get; set; }

        public string RssId { get; set; }

        public string Title { get; set; }
                
        public int? UserRating { get; set; }

        public Single? UserRatingPrediction { get; set; }


    }
}
