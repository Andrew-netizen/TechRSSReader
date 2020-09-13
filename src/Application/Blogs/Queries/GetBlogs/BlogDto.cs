using System;
using System.Collections.Generic;
using System.Text;
using TechRSSReader.Application.Common.Mappings;
using TechRSSReader.Application.RssFeedItems.Queries;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.Blogs.Queries.GetBlogs
{
    public class BlogDto : IMapFrom<Blog>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string XmlAddress { get; set; }

        public IList<KeywordToIncludeDto> KeywordsToInclude { get; set; }

        public IList<KeywordToExcludeDto> KeywordsToExclude { get; set; }

        public IList<RssFeedItemDto> RssFeedItems { get; set; }
    }
}
