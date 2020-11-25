using TechRSSReader.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace TechRSSReader.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<TodoList> TodoLists { get; set; }

        DbSet<TodoItem> TodoItems { get; set; }

        DbSet<Blog> Blogs { get; set; }
        
        DbSet<RssFeedItem> RssFeedItems { get; set; }

        DbSet<WeeklyBlogSummary> WeeklyBlogSummaries { get; set; }

        Task<int> SaveChangesAsync(string userId, CancellationToken cancellationToken);
    }
}
