using System;
using System.Collections.Generic;
using System.Text;
using TechRSSReader.Domain.Common;
using TechRSSReader.Domain.ValueObjects;

namespace TechRSSReader.Domain.Entities
{
    public class Blog: AuditableEntity
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string XmlAddress { get; set; }

        public ICollection<KeywordToInclude> KeywordsToInclude { get; set; }

        public ICollection<KeywordToExclude> KeywordsToExclude { get; set; }
    }
}
