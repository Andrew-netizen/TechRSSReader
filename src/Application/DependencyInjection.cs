using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using TechRSSReader.Application.Common.Behaviours;

namespace TechRSSReader.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            // Don't include auto-mapping in here, because WebUI needs mappings from the Infrastructure project.
            // Perform automapping in Startup.cs in WebUI instead.
            // services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestPerformanceBehaviour<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));

            return services;
        }
    }
}
