using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.RssFeedItems.Queries
{
    public class GetFeedItemDetailsQuery: IRequest<RssFeedItemDetailsDto>
    {

        public int Id { get; set; }

        public class GetFeedItemDetailsQueryHandler : IRequestHandler<GetFeedItemDetailsQuery, RssFeedItemDetailsDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public GetFeedItemDetailsQueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<RssFeedItemDetailsDto> Handle(GetFeedItemDetailsQuery request, CancellationToken cancellationToken)
            {
                RssFeedItem rssFeedItem = await _context.RssFeedItems
                    .Include(r => r.FeedItemUserTags)
                    .Where(r => r.Id == request.Id)
                    .FirstOrDefaultAsync(cancellationToken);
                    
                if (rssFeedItem != null)
                    return _mapper.Map<RssFeedItemDetailsDto>(rssFeedItem);
                else
                    return null;
            }
        }
    }
}
