using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Common;
using TechRSSReader.Domain.Entities;
using TechRSSReader.Infrastructure.Identity;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using EnsureThat;
using Duende.IdentityServer.EntityFramework.Options;

namespace TechRSSReader.Infrastructure.Persistence
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>, IApplicationDbContext
    {
        private readonly IDateTime _dateTime;

        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions,
            IDateTime dateTime) : base(options, operationalStoreOptions)
        {
            _dateTime = dateTime;
        }

        public DbSet<TodoList> TodoLists { get; set; }

        public DbSet<TodoItem> TodoItems { get; set; }

        public DbSet<Blog> Blogs { get; set; }

        public DbSet<FeedItemUserTag> FeedItemUserTags { get; set; }

        public DbSet<RssFeedItem> RssFeedItems { get; set; }

        public DbSet<UserTag> UserTags { get; set;  }

        public DbSet<WeeklyBlogSummary> WeeklyBlogSummaries { get; set; }
        
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            return base.SaveChangesAsync(cancellationToken);
        }

        public Task<int> SaveChangesAsync(string userId, CancellationToken cancellationToken = new CancellationToken())
        {
            EnsureArg.IsNotNullOrEmpty(userId, "User Id");
            foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedBy = userId;
                        entry.Entity.Created = _dateTime.Now;
                        break;
                    case EntityState.Modified:
                        entry.Entity.LastModifiedBy = userId;
                        entry.Entity.LastModified = _dateTime.Now;
                        break;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            builder.Entity<FeedItemUserTag>().HasKey(item => new { item.RssFeedItemId, item.UserTagId });
            base.OnModelCreating(builder);
        }
    }
}
