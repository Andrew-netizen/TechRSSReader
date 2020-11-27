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

            public GetAllBlogSummariesForWeekQueryHandler(IApplicationDbContext context, IMapper mapper,
                ICurrentUserService currentUserService)
            {
                _context = context;
                _mapper = mapper;
                _currentUserService = currentUserService;
            }

            public async Task<WeeklyBlogSummaryViewModel> Handle(GetAllBlogSummariesForWeekQuery request, CancellationToken cancellationToken)
            {
                DateTime lastMonday = DateUtility.GetLastMonday(DateTime.Today);

                WeeklyBlogSummaryViewModel result = new WeeklyBlogSummaryViewModel();

                try
                {
                    List<WeeklyBlogSummaryDto> list = await _context.WeeklyBlogSummaries
                         .Include(item => item.Blog)
                         .Where(item => item.WeekBegins.Equals(lastMonday))
                         .Where(item => (item.Blog != null) && item.Blog.CreatedBy.Equals(_currentUserService.UserId))
                         .ProjectTo<WeeklyBlogSummaryDto>(_mapper.ConfigurationProvider)
                         .AsNoTracking()
                         .ToListAsync(cancellationToken);

                    list = list.OrderByDescending(item => item.NewNotExcluded).ToList();

                    result.WeeklyBlogSummaries = list;
                }
                catch (Exception exception)
                {
                    Console.WriteLine(exception.Message);
                }
              
                return result;
                
            }
        }
    }
}
