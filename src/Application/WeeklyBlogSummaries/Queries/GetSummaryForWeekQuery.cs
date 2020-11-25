using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.WeeklyBlogSummaries.Queries
{
    public class GetSummaryForWeekQuery: IRequest<WeeklyBlogSummaryDto>
    {
        public int BlogId { get; set; }
        public DateTime WeekBegins { get; set; }

        public class GetSummaryForWeekQueryHandler : IRequestHandler<GetSummaryForWeekQuery, WeeklyBlogSummaryDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public GetSummaryForWeekQueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper; 
            }
            public async Task<WeeklyBlogSummaryDto> Handle(GetSummaryForWeekQuery request, CancellationToken cancellationToken)
            {
                WeeklyBlogSummary blogSummary = await _context.WeeklyBlogSummaries
                        .Where(item => item.BlogId == request.BlogId)
                        .Where(item => item.WeekBegins.Equals(request.WeekBegins))
                        .AsNoTracking()
                        .FirstOrDefaultAsync();

                if (blogSummary != null)
                {
                    return _mapper.Map<WeeklyBlogSummaryDto>(blogSummary);
                }
                else
                {
                    return null;
                }
            }
        }
    }
}
