using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.WeeklyBlogSummaries.Queries;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.WeeklyBlogSummaries.Commands.CreateWeeklyBlogSummary
{
    public class CreateWeeklyBlogSummaryCommand: IRequest<WeeklyBlogSummaryDto>
    {
        public int BlogId { get; set; }
        public DateTime WeekBegins { get; set; }

        public class CreateWeeklyBlogSummaryCommandHandler : IRequestHandler<CreateWeeklyBlogSummaryCommand, WeeklyBlogSummaryDto>
        {

            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            private readonly ILogger _logger;

            public CreateWeeklyBlogSummaryCommandHandler(IApplicationDbContext context, IMapper mapper, ILogger<CreateWeeklyBlogSummaryCommandHandler> logger)
            {
                _context = context;
                _mapper = mapper;
                _logger = logger; 
            }
            public async Task<WeeklyBlogSummaryDto> Handle(CreateWeeklyBlogSummaryCommand request, CancellationToken cancellationToken)
            {
                WeeklyBlogSummary blogSummary = await _context.WeeklyBlogSummaries
                    .Where(summary => summary.BlogId == request.BlogId)
                    .Where(summary => summary.WeekBegins == request.WeekBegins)
                    .FirstOrDefaultAsync();

                if (blogSummary != null)
                {
                    _logger.LogWarning($"Trying to create Weekly blog summary when one already exists, blog id:{request.BlogId}, week begins:{request.WeekBegins}");
                    return null;
                }

                Blog blog = await _context.Blogs
                                .Include(blog => blog.RssFeedItems)
                                .Where(blog => blog.Id == request.BlogId)
                                .AsNoTracking()
                                .FirstOrDefaultAsync(cancellationToken);

                if (blog != null)
                {
                    WeeklyBlogSummary weeklyBlogSummary = new WeeklyBlogSummary(blog.Id, blog.RssFeedItems.ToList(), request.WeekBegins);
                    _context.WeeklyBlogSummaries.Add(weeklyBlogSummary);
                    await _context.SaveChangesAsync(blog.CreatedBy, cancellationToken);
                    return _mapper.Map<WeeklyBlogSummaryDto>(weeklyBlogSummary);
                }
                else
                {
                    return null;
                }
            }
        }
    }
}
