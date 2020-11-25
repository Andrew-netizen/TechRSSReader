using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.WeeklyBlogSummaries.Queries
{
    public class GetLatestSummariesQuery: IRequest<WeeklyBlogSummaryViewModel>
    {
        public int BlogId { get; set; }

        public class GetLatestSummariesQueryHandler : IRequestHandler<GetLatestSummariesQuery, WeeklyBlogSummaryViewModel>
        {

            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            private readonly ICurrentUserService _currentUserService;

            public GetLatestSummariesQueryHandler(IApplicationDbContext context, IMapper mapper,
                ICurrentUserService currentUserService)
            {
                _context = context;
                _mapper = mapper;
                _currentUserService = currentUserService;
            }

            public async Task<WeeklyBlogSummaryViewModel> Handle(GetLatestSummariesQuery request, CancellationToken cancellationToken)
            {
                return new WeeklyBlogSummaryViewModel
                {
                    WeeklyBlogSummaries = await _context.WeeklyBlogSummaries
                       .Include(item => item.Blog)
                       .Where(item => item.BlogId == request.BlogId)
                       .Where(item => item.Blog.CreatedBy.Equals(_currentUserService.UserId))
                       .ProjectTo<WeeklyBlogSummaryDto>(_mapper.ConfigurationProvider)
                       .OrderByDescending(summary => summary.WeekBegins)
                       .Take(5)
                       .AsNoTracking()
                       .ToListAsync(cancellationToken)
                };
                
            }
        }
    }
}
