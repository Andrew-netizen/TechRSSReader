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
    public class GetRatedFeedItemsQuery: IRequest<IList<RssFeedItem>>
    {
        public class GetRatedFeedItemsQueryHandler : IRequestHandler<GetRatedFeedItemsQuery, IList<RssFeedItem>>
        {
            private readonly IApplicationDbContext _context;

            public GetRatedFeedItemsQueryHandler(IApplicationDbContext context)
            {
                _context = context; 
            }

            public async Task<IList<RssFeedItem>> Handle(GetRatedFeedItemsQuery request, CancellationToken cancellationToken)
            {
                List<RssFeedItem> result = await _context.RssFeedItems
                    .Where(item => item.UserRating.HasValue)
                    .AsNoTracking()
                    .ToListAsync();

                return result; 
            }
        }
    }
}
