using System;
using System.Collections.Generic;
using System.Text;

namespace TechRSSReader.Application.RssFeedItems.Queries
{
    public class FeedItemsViewModel
    {
        public FeedItemsViewModel()
        {
            RssFeedItems = new List<RssFeedItemDto>();
            UserTagId = null; 
        }

        public IList<RssFeedItemDto> RssFeedItems { get; set; }

        public int? UserTagId { get; set; }
    }
}
