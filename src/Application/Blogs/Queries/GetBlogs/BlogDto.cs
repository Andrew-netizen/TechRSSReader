using System.Collections.Generic;
using TechRSSReader.Application.Common.Mappings;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.Blogs.Queries.GetBlogs
{
    public class BlogDto : IMapFrom<Blog>
    {
        public int Id { get; set; }

        public string Title { get; set; }
        
        public IList<KeywordToIncludeDto> KeywordsToInclude { get; set; }

        public IList<KeywordToExcludeDto> KeywordsToExclude { get; set; }

        public int? UnreadUnexcludedItems { get; set; }

        public string XmlAddress { get; set; }

    }
}
