using System;
using System.Collections.Generic;
using System.Text;

namespace TechRSSReader.Domain.Entities
{
    public class FeedItemUserTag
    {

        public int RssFeedItemId { get; set; }

        public int UserTagId { get; set; }

        public virtual RssFeedItem RssFeedItem { get; set; }

        public virtual UserTag UserTag { get; set; }

    }
}
