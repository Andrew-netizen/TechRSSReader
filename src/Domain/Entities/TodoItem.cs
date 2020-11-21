using TechRSSReader.Domain.Common;
using TechRSSReader.Domain.Enums;
using System;

namespace TechRSSReader.Domain.Entities
{
    public class TodoItem : AuditableEntity
    {
        public long Id { get; set; }

        public int ListId { get; set; }

        public string Title { get; set; }

        public string Note { get; set; }

        public bool Done { get; set; }

        public DateTime? Reminder { get; set; }

        public PriorityLevel Priority { get; set; }


        public virtual TodoList List { get; set; }
    }
}
