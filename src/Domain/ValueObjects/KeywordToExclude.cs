using System;
using System.Collections.Generic;
using System.Text;
using TechRSSReader.Domain.Common;

namespace TechRSSReader.Domain.ValueObjects
{
    public class KeywordToExclude: ValueObject
    {
        public int BlogId { get; set; }
        public string Keyword { get; set; }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return BlogId;
            yield return Keyword; 
        }
    }
}
