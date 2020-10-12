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
using TechRSSReader.Application.Common.Mappings;

namespace TechRSSReader.Application.RssFeedItems.Queries
{
    public class GetBookmarkedItemsQuery: IRequest<FeedItemsViewModel>
    {

        public class GetBookmarkedItemsQueryHandler : IRequestHandler<GetBookmarkedItemsQuery, FeedItemsViewModel>
        {

            private readonly IApplicationDbContext _context;
            private readonly ICurrentUserService _currentUserService;
            private readonly IMapper _mapper;

            public GetBookmarkedItemsQueryHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IMapper mappper)
            {
                _context = context;
                _currentUserService = currentUserService;
                _mapper = mappper; 
               
            }

            public async Task<FeedItemsViewModel> Handle(GetBookmarkedItemsQuery request, CancellationToken cancellationToken)
            {
                var viewModel = new FeedItemsViewModel();

                viewModel.RssFeedItems = await _context.RssFeedItems
                    .Where(item => item.Bookmarked)
                    .Where(item => item.CreatedBy.Equals(_currentUserService.UserId))
                    .ProjectTo<RssFeedItemDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return viewModel; 
            }
        }
    }
}
