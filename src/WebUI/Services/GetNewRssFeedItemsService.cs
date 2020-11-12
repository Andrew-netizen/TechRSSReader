using Coravel.Invocable;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Commands.RetrieveFeedItems;
using TechRSSReader.Application.Blogs.Queries.GetAllUserBlogs;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.WebUI.Services
{
    public class GetNewRssFeedItemsService : IInvocable, ICancellableInvocable
    {
        private readonly ILogger<GetNewRssFeedItemsService> _logger;
        private readonly IServiceProvider _serviceProvider;

        public GetNewRssFeedItemsService(IServiceProvider serviceProvider)
        {
            _logger = serviceProvider.GetService<ILogger<GetNewRssFeedItemsService>>();
            _serviceProvider = serviceProvider;
            
        }

        public CancellationToken CancellationToken { get; set; }

        public async Task Invoke()
        {
            try
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var services = scope.ServiceProvider;
                    var mediator = services.GetService<IMediator>();
                    _logger.LogInformation("Started GetNewRssFeedItemsService at" + DateTime.Now);
                    IList<Blog> blogs = await mediator.Send(new GetAllUserBlogsQuery(), CancellationToken);
                    foreach (Blog blog in blogs)
                    {
                        int feedItemsRetrieved = await mediator.Send(new RetrieveFeedItemsCommand { BlogId = blog.Id }, CancellationToken);
                        _logger.LogInformation($"GetNewRssFeedItemService, retrieved {feedItemsRetrieved} items for blog id={blog.Id}");
                    }
                    _logger.LogInformation("Finished GetNewRssFeedItemsService at" + DateTime.Now);
                }
             
            }
            catch (Exception exception)
            {
                _logger.LogInformation($"Exception in GetNewRssFeedItemsService:{exception.Message}, Stack Trace:{exception.StackTrace}");
            }
        }
    }
}
