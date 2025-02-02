﻿using TechRSSReader.Domain.Common;
using System.Collections.Generic;

namespace TechRSSReader.Domain.Entities
{
    public class TodoList : AuditableEntity
    {
        public TodoList()
        {
            Items = new List<TodoItem>();
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public string? Colour { get; set; }

        public virtual IList<TodoItem> Items { get; set; }
    }
}
