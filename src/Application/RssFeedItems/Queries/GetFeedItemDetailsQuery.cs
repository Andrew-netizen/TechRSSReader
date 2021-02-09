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
            private readonly IHtmlSanitizationService _htmlSanitizationService;

            public GetFeedItemDetailsQueryHandler(IApplicationDbContext context, IMapper mapper, IHtmlSanitizationService htmlSanitizationService)
            {
                _context = context;
                _mapper = mapper;
                _htmlSanitizationService = htmlSanitizationService; 
            }

            public async Task<RssFeedItemDetailsDto> Handle(GetFeedItemDetailsQuery request, CancellationToken cancellationToken)
            {
                RssFeedItem rssFeedItem = await _context.RssFeedItems
                    .Include(r => r.FeedItemUserTags)
                    .Where(r => r.Id == request.Id)
                    .FirstOrDefaultAsync(cancellationToken);
                    
                if (rssFeedItem != null)
                {
                    RssFeedItemDetailsDto result = _mapper.Map<RssFeedItemDetailsDto>(rssFeedItem);
                    result.Content = _htmlSanitizationService.Sanitize(result.Content);
                    result.Description = _htmlSanitizationService.Sanitize(result.Description);
                    return result; 
                }
                    
                else
                    return null;
            }
        }
    }
}
