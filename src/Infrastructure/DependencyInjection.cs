using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Test;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.ML;
using System.Collections.Generic;
using System.Security.Claims;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Infrastructure.FeedReader;
using TechRSSReader.Infrastructure.Files;
using TechRSSReader.Infrastructure.Identity;
using TechRSSReader.Infrastructure.InterestPredictor;
using TechRSSReader.Infrastructure.Persistence;
using TechRSSReader.Infrastructure.Services;
using TechRSSReaderML.Model;

namespace TechRSSReader.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection"), 
                    b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

            services.AddScoped<IApplicationDbContext>(provider => provider.GetService<ApplicationDbContext>());
                        
            services.AddDefaultIdentity<ApplicationUser>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            if (environment.IsEnvironment("Test"))
            {
                services.AddIdentityServer()
                    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>(options =>
                    {
                        options.Clients.Add(new Client
                        {
                            ClientId = "TechRSSReader.IntegrationTests",
                            AllowedGrantTypes = { GrantType.ResourceOwnerPassword },
                            ClientSecrets = { new Secret("secret".Sha256()) },
                            AllowedScopes = { "TechRSSReader.WebUIAPI", "openid", "profile" }
                        });
                    }).AddTestUsers(new List<TestUser>
                    {
                        new TestUser
                        {
                            SubjectId = "f26da293-02fb-4c90-be75-e4aa51e0bb17",
                            Username = "jason@clean-architecture",
                            Password = "TechRSSReader!",
                            Claims = new List<Claim>
                            {
                                new Claim(JwtClaimTypes.Email, "jason@clean-architecture")
                            }
                        }
                    });
            }
            else
            {
                services.AddIdentityServer()
                    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

                services.AddTransient<IDateTime, DateTimeService>();
                services.AddTransient<IIdentityService, IdentityService>();
                services.AddTransient<ICsvFileBuilder, CsvFileBuilder>();
            }

            services.AddTransient<IFeedReader, RssFeedReader>();
            services.AddTransient<IUserInterestPredictor, UserInterestPredictor>();
            services.AddPredictionEnginePool<UserInterestInput, UserInterestOutput>()
                .FromFile(modelName: "UserInterestAnalysisModel", filePath: "MLModels/MLModel.zip", watchForChanges: true);


            services.AddAuthentication()
                .AddIdentityServerJwt();

            return services;
        }
    }
}
