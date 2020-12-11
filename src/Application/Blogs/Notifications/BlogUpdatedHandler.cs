using MediatR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.Blogs.Notifications
{
    public class BlogUpdatedHandler : INotificationHandler<BlogUpdatedNotification>
    {
        private readonly IApplicationDbContext _context;
        private readonly ILogger<BlogUpdatedHandler> _logger;

        public BlogUpdatedHandler(IApplicationDbContext context,
            ILogger<BlogUpdatedHandler> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task Handle(BlogUpdatedNotification notification, CancellationToken cancellationToken)
        {
            try
            {
                Blog blog = _context.Blogs.Find(notification.BlogId);

                List<RssFeedItem> feedItems = _context.RssFeedItems
                                                    .Where(item => item.BlogId == notification.BlogId)
                                                    .ToList();
                foreach (RssFeedItem feedItem in feedItems)
                {
                    feedItem.ExcludedByKeyword = feedItem.ContainsExcludedKeywords(blog);
                    _context.RssFeedItems.Update(feedItem);
                }

                await _context.SaveChangesAsync(blog.LastModifiedBy, cancellationToken);

                blog.UnreadUnexcludedItems = _context.RssFeedItems
                                                .Where(item => item.BlogId == notification.BlogId)
                                                .Where(item => item.ExcludedByKeyword.HasValue && !item.ExcludedByKeyword.Value)
                                                .Where(item => !item.ReadAlready)
                                                .Count();

                _context.Blogs.Update(blog);

                await _context.SaveChangesAsync(blog.LastModifiedBy, cancellationToken);

            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception in BlogUpdatedHandler:{exception.Message}, Stack Trace:{exception.StackTrace}");
            }
            
        }
    }
}
