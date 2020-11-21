using System;
using System.Collections.Generic;
using System.Text;
using TechRSSReader.Application.Common.Mappings;
using TechRSSReader.Application.RssFeedItems.Queries;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.Blogs.Queries.GetBlogs
{
    public class BlogDetailsDto: BlogDto 
    {
        public IList<RssFeedItemDto> RssFeedItems { get; set; }
    }
}
