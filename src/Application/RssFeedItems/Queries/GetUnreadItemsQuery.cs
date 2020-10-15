using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.RssFeedItems.Queries
{
    public class GetUnreadItemsQuery: IRequest<FeedItemsViewModel>
    {
        public class GetUnreadItemsQueryHandler : IRequestHandler<GetUnreadItemsQuery, FeedItemsViewModel>
        {
            private readonly IApplicationDbContext _context;
            private readonly ICurrentUserService _currentUserService;
            private readonly IMapper _mapper;
            private readonly IUserInterestPredictor _userInterestPredictor;

            public GetUnreadItemsQueryHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IMapper mappper, IUserInterestPredictor userInterestPredictor)
            {
                _context = context;
                _currentUserService = currentUserService;
                _mapper = mappper;
                _userInterestPredictor = userInterestPredictor;

            }

            public async Task<FeedItemsViewModel> Handle(GetUnreadItemsQuery request, CancellationToken cancellationToken)
            {
                var viewModel = new FeedItemsViewModel();

                IList<RssFeedItem> feedItems = await _context.RssFeedItems
                    .Include(item => item.Blog)
                    .Where(item => !item.ReadAlready)
                    .Where(item => item.CreatedBy.Equals(_currentUserService.UserId))
                    .AsNoTracking()
                    .ToListAsync(cancellationToken);

                foreach (RssFeedItem feedItem in feedItems)
                {
                    if (!feedItem.UserRatingPrediction.HasValue)
                    {
                        float predictedStarRating = _userInterestPredictor.PredictStarRating(feedItem);
                        feedItem.UserRatingPrediction = predictedStarRating;
                    }
                    RssFeedItemDto feedItemDto = _mapper.Map<RssFeedItemDto>(feedItem);
                    feedItemDto.BlogTitle = feedItem.Blog.Title;
                    viewModel.RssFeedItems.Add(feedItemDto);
                }

                return viewModel;
            }
        }
    }
}
