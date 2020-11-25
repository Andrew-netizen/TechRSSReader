using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.RssFeedItems.Queries
{
    public class GetTopRatedFeedItemsQuery : IRequest<FeedItemsViewModel>
    {
        public class GetTopRatedFeedItemsQueryHandler : IRequestHandler<GetTopRatedFeedItemsQuery, FeedItemsViewModel>
        {
            private readonly IApplicationDbContext _context;
            private readonly ICurrentUserService _currentUserService;
            private readonly IMapper _mapper;
            
            public GetTopRatedFeedItemsQueryHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IMapper mappper)
            {
                _context = context;
                _currentUserService = currentUserService;
                _mapper = mappper;
            }
            public async Task<FeedItemsViewModel> Handle(GetTopRatedFeedItemsQuery request, CancellationToken cancellationToken)
            {
                FeedItemsViewModel result = new FeedItemsViewModel();

                IList<RssFeedItem> rssFeedItems = await _context.RssFeedItems
                    .Include(item => item.Blog)
                    .Where(item => !item.ReadAlready)
                    .Where(item => (item.ExcludedByKeyword.HasValue && !item.ExcludedByKeyword.Value))
                    .Where(item => item.UserRatingPrediction.HasValue)
                    .Where(item => item.CreatedBy.Equals(_currentUserService.UserId))
                    .OrderByDescending(item => item.UserRatingPrediction)
                    .Take(50)
                    .AsNoTracking()
                    .ToListAsync(cancellationToken);

                foreach (RssFeedItem feedItem in rssFeedItems)
                {
                    RssFeedItemDto feedItemDto = _mapper.Map<RssFeedItemDto>(feedItem);
                    feedItemDto.BlogTitle = feedItem.Blog.Title;
                    result.RssFeedItems.Add(feedItemDto);
                }

                return result;
            }
        }
    }
}
