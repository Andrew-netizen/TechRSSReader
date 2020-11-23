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
                var viewModel = new FeedItemsViewModel();

                viewModel.RssFeedItems = await _context.RssFeedItems
                    .Include(item => item.Blog)
                    .Where(item => !item.ReadAlready)
                    .Where(item => (item.ExcludedByKeyword.HasValue && !item.ExcludedByKeyword.Value))
                    .Where(item => item.UserRatingPrediction.HasValue)
                    .Where(item => item.CreatedBy.Equals(_currentUserService.UserId))
                    .ProjectTo<RssFeedItemDto>(_mapper.ConfigurationProvider)
                    .OrderByDescending(item => item.UserRatingPrediction)
                    .Take(50)
                    .AsNoTracking()
                    .ToListAsync(cancellationToken);
                
                return viewModel;
            }
        }
    }
}
