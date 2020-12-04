using TechRSSReader.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace TechRSSReader.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        

        DbSet<Blog> Blogs { get; set; }

        DbSet<FeedItemUserTag> FeedItemUserTags { get; set; }

        DbSet<RssFeedItem> RssFeedItems { get; set; }

        DbSet<TodoList> TodoLists { get; set; }

        DbSet<TodoItem> TodoItems { get; set; }

        DbSet<UserTag> UserTags { get; set; }

        DbSet<WeeklyBlogSummary> WeeklyBlogSummaries { get; set; }

        Task<int> SaveChangesAsync(string userId, CancellationToken cancellationToken);
    }
}
