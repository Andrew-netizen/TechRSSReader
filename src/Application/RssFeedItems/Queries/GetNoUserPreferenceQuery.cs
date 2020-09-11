using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.RssFeedItems.Queries
{
    public class GetNoUserPreferenceQuery: IRequest<RssFeedItemDto>
    {
        public int BlogId { get; set; }

        public class GetNoUserPreferenceQueryHandler : IRequestHandler<GetNoUserPreferenceQuery, RssFeedItemDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public GetNoUserPreferenceQueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }


            public async Task<RssFeedItemDto> Handle(GetNoUserPreferenceQuery request, CancellationToken cancellationToken)
            {
                RssFeedItem rssFeedItem = await _context.RssFeedItems
                    .Where(item => item.BlogId == request.BlogId)
                    .Where(item => !item.UserInterested.HasValue)
                    .FirstOrDefaultAsync();

                if (rssFeedItem != null)
                    return _mapper.Map<RssFeedItemDto>(rssFeedItem);
                else
                    return null;
            }
        }
    }
}
