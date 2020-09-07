using TechRSSReader.Application.Common.Mappings;
using TechRSSReader.Domain.ValueObjects;

namespace TechRSSReader.Application.Blogs.Queries.GetBlogs
{
    public class KeywordToIncludeDto: IMapFrom<KeywordToInclude>
    {
        public int BlogId { get; set; }
        public string Keyword { get; set; }
    }
}
