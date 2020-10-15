using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.RssFeedItems.Queries
{
    public class GetBookmarkedItemsQuery: IRequest<FeedItemsViewModel>
    {

        public class GetBookmarkedItemsQueryHandler : IRequestHandler<GetBookmarkedItemsQuery, FeedItemsViewModel>
        {

            private readonly IApplicationDbContext _context;
            private readonly ICurrentUserService _currentUserService;
            private readonly IMapper _mapper;
            private readonly IUserInterestPredictor _userInterestPredictor;

            public GetBookmarkedItemsQueryHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IMapper mappper, IUserInterestPredictor userInterestPredictor)
            {
                _context = context;
                _currentUserService = currentUserService;
                _mapper = mappper;
                _userInterestPredictor = userInterestPredictor; 
               
            }

            public async Task<FeedItemsViewModel> Handle(GetBookmarkedItemsQuery request, CancellationToken cancellationToken)
            {
                var viewModel = new FeedItemsViewModel();

                IList<RssFeedItem> rssFeedItems = await _context.RssFeedItems
                    .Include(item => item.Blog)
                    .Where(item => item.Bookmarked)
                    .Where(item => item.CreatedBy.Equals(_currentUserService.UserId))
                    .AsNoTracking()
                    .ToListAsync(cancellationToken);
                    

                foreach (RssFeedItem rssFeedItem in rssFeedItems)
                {
                    if (!rssFeedItem.UserRatingPrediction.HasValue)
                    {
                        float predictedStarRating = _userInterestPredictor.PredictStarRating(rssFeedItem);
                        rssFeedItem.UserRatingPrediction = predictedStarRating;
                    }
                    RssFeedItemDto rssFeedItemDto = _mapper.Map<RssFeedItemDto>(rssFeedItem);
                    rssFeedItemDto.BlogTitle = rssFeedItem.Blog.Title;
                    viewModel.RssFeedItems.Add(rssFeedItemDto);

                }

                return viewModel; 
            }
        }
    }
}
