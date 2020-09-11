using AutoMapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.RssFeedItems.Queries
{
    public class GetRssFeedItemQuery: IRequest<RssFeedItemDto>
    {

        public int Id { get; set; }

        public class GetRssFeedItemQueryHandler : IRequestHandler<GetRssFeedItemQuery, RssFeedItemDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public GetRssFeedItemQueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<RssFeedItemDto> Handle(GetRssFeedItemQuery request, CancellationToken cancellationToken)
            {
                RssFeedItem rssFeedItem = await _context.RssFeedItems.FindAsync(request.Id);
                                
                if (rssFeedItem != null)
                    return _mapper.Map<RssFeedItemDto>(rssFeedItem);
                else
                    return null;
            }
        }
    }
}
