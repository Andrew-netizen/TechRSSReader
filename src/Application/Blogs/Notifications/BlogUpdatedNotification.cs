using System;
using System.Collections.Generic;
using System.Text;
using MediatR;

namespace TechRSSReader.Application.Blogs.Notifications
{
    public class BlogUpdatedNotification: INotification
    {
        public int BlogId { get; set; }
    }
}
