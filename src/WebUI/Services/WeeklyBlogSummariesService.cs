using Coravel.Invocable;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Queries.GetAllUserBlogs;
using TechRSSReader.Application.WeeklyBlogSummaries.Queries;
using TechRSSReader.Domain.Entities;
using TechRSSReader.Application.Common.Utils;
using TechRSSReader.Application.WeeklyBlogSummaries.Commands.CreateWeeklyBlogSummary;

namespace TechRSSReader.WebUI.Services
{
    public class WeeklyBlogSummariesService: IInvocable, ICancellableInvocable
    {
        private readonly ILogger<WeeklyBlogSummariesService> _logger;
        private readonly IServiceProvider _serviceProvider;

        public WeeklyBlogSummariesService(IServiceProvider serviceProvider)
        {
            _logger = serviceProvider.GetService<ILogger<WeeklyBlogSummariesService>>();
            _serviceProvider = serviceProvider;
        }
        
        public CancellationToken CancellationToken { get; set; }

        public async Task Invoke()
        {
            try
            {
                using var scope = _serviceProvider.CreateScope();
                var services = scope.ServiceProvider;
                var mediator = services.GetService<IMediator>();
                _logger.LogInformation("Started WeeklyBlogSummariesService at" + DateTime.Now);
                IList<Blog> blogs = await mediator.Send(new GetAllUserBlogsQuery(), CancellationToken);
                DateTime lastMonday = DateUtility.GetLastMonday(DateTime.Today);
                foreach (Blog blog in blogs)
                {
                    var summary = await mediator.Send(new GetSummaryForWeekQuery { BlogId = blog.Id, WeekBegins = lastMonday });
                    if (summary == null)
                    {
                        WeeklyBlogSummaryDto result = await mediator.Send(new CreateWeeklyBlogSummaryCommand { BlogId = blog.Id, WeekBegins = lastMonday });
                        if (result != null)
                        {
                            _logger.LogInformation($"WeeklyBlogSummariesService created summary id:{result.Id} for Blog id={result.BlogId}, week begins:{result.WeekBegins}");
                        }
                        else
                        {
                            _logger.LogWarning($"Failed to create weeklyBlogSummary for Blog id:{blog.Id}, week begins:{lastMonday}");
                        }
                    }
                }
                _logger.LogInformation("Finished WeeklyBlogSummariesService at" + DateTime.Now);
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception in WeeklyBlogSummariesService:{exception.Message}, Stack Trace:{exception.StackTrace}");
            }
            
        }
    }
}
