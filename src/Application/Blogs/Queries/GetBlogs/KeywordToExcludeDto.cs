using TechRSSReader.Application.Common.Mappings;
using TechRSSReader.Domain.ValueObjects;

namespace TechRSSReader.Application.Blogs.Queries.GetBlogs
{
    public class KeywordToExcludeDto : IMapFrom<KeywordToExclude>
    {
        public int BlogId { get; set; }
        public string Keyword { get; set; }
    }
}
