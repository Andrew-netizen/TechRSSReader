using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;

namespace TechRSSReader.Application.RssFeedItems.Queries
{
    public class GetUnreadItemsQuery: IRequest<FeedItemsViewModel>
    {
        public class GetUnreadItemsQueryHandler : IRequestHandler<GetUnreadItemsQuery, FeedItemsViewModel>
        {
            private readonly IApplicationDbContext _context;
            private readonly ICurrentUserService _currentUserService;
            private readonly IMapper _mapper;

            public GetUnreadItemsQueryHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IMapper mappper)
            {
                _context = context;
                _currentUserService = currentUserService;
                _mapper = mappper;

            }

            public async Task<FeedItemsViewModel> Handle(GetUnreadItemsQuery request, CancellationToken cancellationToken)
            {
                var viewModel = new FeedItemsViewModel();

                viewModel.RssFeedItems = await _context.RssFeedItems
                    .Where(item => !item.ReadAlready)
                    .Where(item => item.CreatedBy.Equals(_currentUserService.UserId))
                    .ProjectTo<RssFeedItemDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return viewModel;
            }
        }
    }
}
