using AutoMapper;
using FluentValidation.Results;
using MediatR;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.Common.Models;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.Blogs.Commands.RetrieveFeedItems
{
    public class RetrieveFeedItemsCommand: IRequest<int>
    {
        public int BlogId { get; set; }

        public class RetrieveFeedItemsCommandHandler : IRequestHandler<RetrieveFeedItemsCommand, int>
        {
            private readonly IApplicationDbContext _context;
            private readonly IFeedReader _feedReader;
            private readonly IHtmlSanitizationService _htmlSanitizationService;
            private readonly ILogger<RetrieveFeedItemsCommandHandler> _logger;
            
            public RetrieveFeedItemsCommandHandler(IApplicationDbContext context, IFeedReader feedReader, 
                ILogger<RetrieveFeedItemsCommandHandler> logger, IHtmlSanitizationService htmlSanitizationService)
            {
                _context = context;
                _feedReader = feedReader;
                _htmlSanitizationService = htmlSanitizationService; 
                _logger = logger;
                
            }

            public async Task<int> Handle(RetrieveFeedItemsCommand request, CancellationToken cancellationToken)
            {
                int result = 0;
                Blog rssFeed = _context.Blogs.Find(request.BlogId);
                
                if (rssFeed == null)
                {
                    return 0;
                }

                try
                {

                    FeedReadResult feedResponse = await _feedReader.ReadAsync(rssFeed.XmlAddress, cancellationToken);
                    RssFeedItemValidator validator = new RssFeedItemValidator();
                    foreach (RssFeedItem item in feedResponse.RssFeedItems)
                    {
                        ValidationResult validationResult = validator.Validate(item);
                        if (!validationResult.IsValid)
                        {
                            foreach (var failure in validationResult.Errors)
                            {
                                _logger.LogWarning(failure.ErrorMessage);
                            }
                            continue;
                        }

                        var existingItem = _context.RssFeedItems
                                                .Where(rssItem => rssItem.Link == item.Link)
                                                .FirstOrDefault();
                        if (existingItem == null)
                        {
                            item.BlogId = request.BlogId;
                            item.Title = _htmlSanitizationService.Sanitize(item.Title);
                            item.Categories = _htmlSanitizationService.Sanitize(item.Categories);
                            item.ExcludedByKeyword = item.ContainsExcludedKeywords(rssFeed);
                            _context.RssFeedItems.Add(item);
                        }
                    }


                    result = await _context.SaveChangesAsync(rssFeed.CreatedBy, cancellationToken);

                    rssFeed.UnreadUnexcludedItems = _context.RssFeedItems
                                                .Where(item => item.BlogId == request.BlogId)
                                                .Where(item => item.ExcludedByKeyword.HasValue && !item.ExcludedByKeyword.Value)
                                                .Where(item => !item.ReadAlready)
                                                .Count();

                    await _context.SaveChangesAsync(rssFeed.CreatedBy, cancellationToken);

                }
                catch(Exception ex)
                {
                    _logger.LogError(ex, "Failed to retrieve RSS Feed items");
                    throw; 
                }

                return result; 
            }
         
        }
    }
}
