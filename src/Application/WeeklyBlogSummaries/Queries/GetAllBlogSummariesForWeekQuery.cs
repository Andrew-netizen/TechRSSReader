using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.Common.Utils;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.WeeklyBlogSummaries.Queries
{
    public class GetAllBlogSummariesForWeekQuery: IRequest<WeeklyBlogSummaryViewModel>
    {

        public class GetAllBlogSummariesForWeekQueryHandler : IRequestHandler<GetAllBlogSummariesForWeekQuery, WeeklyBlogSummaryViewModel>
        {

            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            private readonly ICurrentUserService _currentUserService;
            private readonly ILogger<GetAllBlogSummariesForWeekQueryHandler> _logger; 

            public GetAllBlogSummariesForWeekQueryHandler(IApplicationDbContext context, IMapper mapper,
                ICurrentUserService currentUserService, ILogger<GetAllBlogSummariesForWeekQueryHandler> logger)
            {
                _context = context;
                _mapper = mapper;
                _currentUserService = currentUserService;
                _logger = logger; 
            }

            public async Task<WeeklyBlogSummaryViewModel> Handle(GetAllBlogSummariesForWeekQuery request, CancellationToken cancellationToken)
            {
                WeeklyBlogSummaryViewModel result = new WeeklyBlogSummaryViewModel();

                try
                {
                    WeeklyBlogSummary latestWeeklySummary = await _context.WeeklyBlogSummaries
                            .OrderByDescending(item => item.WeekBegins)
                            .FirstOrDefaultAsync(cancellationToken);

                    DateTime latestSummaryDate = (latestWeeklySummary != null) ? latestWeeklySummary.WeekBegins : DateUtility.GetLastMonday(DateTime.Today);
                    
                    List<WeeklyBlogSummaryDto> list = await _context.WeeklyBlogSummaries
                         .Include(item => item.Blog)
                         .Where(item => item.WeekBegins.Equals(latestSummaryDate))
                         .Where(item => (item.Blog != null) && item.Blog.CreatedBy.Equals(_currentUserService.UserId))
                         .ProjectTo<WeeklyBlogSummaryDto>(_mapper.ConfigurationProvider)
                         .AsNoTracking()
                         .ToListAsync(cancellationToken);

                    list = list.OrderByDescending(item => item.NewNotExcluded).ToList();

                    result.WeeklyBlogSummaries = list;
                }
                catch (Exception exception)
                {
                    _logger.LogError($"GetAllBlogSummariesForWeekQuery. Exception :{exception.Message}");
                }
              
                return result;
                
            }
        }
    }
}
