using System;
using System.Collections.Generic;
using System.Text;
using TechRSSReader.Domain.Common;

namespace TechRSSReader.Domain.Entities
{
    public class UserTag: AuditableEntity
    {
        public int Id { get; set; }

        public string Text { get; set; }

    }
}
