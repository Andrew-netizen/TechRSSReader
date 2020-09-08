using System;
using System.Collections.Generic;
using System.Text;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.Common.Models
{
    public class FeedReadResult
    {

        public FeedReadResult()
        {
            RssFeedItems = new List<RssFeedItem>();
        }

        public List<RssFeedItem> RssFeedItems { get; set; }
    }
}
