using Coravel.Invocable;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Queries.GetAllUserBlogs;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.WebUI.Services
{
    public class GetAllBlogsService : IInvocable, ICancellableInvocable
    {
        private readonly ILogger<GetAllBlogsService> _logger;
        private readonly IServiceProvider _serviceProvider;

        public GetAllBlogsService(IServiceProvider serviceProvider)
        {
            _logger = serviceProvider.GetService<ILogger<GetAllBlogsService>>();
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
                    IList<Blog> blogs = await mediator.Send(new GetAllUserBlogsQuery(), CancellationToken);
                    _logger.LogInformation("Finished GetAllBlogsService at" + DateTime.Now);
                }

            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception in GetAllBlogsService:{exception.Message}, Stack Trace:{exception.StackTrace}");
            }
        }
    }
}
