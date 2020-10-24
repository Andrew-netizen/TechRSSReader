using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.AzureKeyVault;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;
using System;
using System.Threading.Tasks;
using TechRSSReader.Infrastructure.Identity;
using TechRSSReader.Infrastructure.Persistence;

namespace TechRSSReader.WebUI
{
    public class Program
    {
        public async static Task Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Warning()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                .Enrich.FromLogContext()
                .WriteTo.Debug()
                .CreateLogger();

            try
            {
                var host = CreateWebHostBuilder(args).Build();

                using (var scope = host.Services.CreateScope())
                {
                    var services = scope.ServiceProvider;

                    try
                    {
                        var context = services.GetRequiredService<ApplicationDbContext>();
                        context.Database.Migrate();

                        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();

                        await ApplicationDbContextSeed.SeedAsync(userManager);
                    }
                    catch (Exception ex)
                    {
                        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

                        logger.LogError(ex, "An error occurred while migrating or seeding the database.");
                    }
                }

                host.Run();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly");
            }
            finally
            {
                Log.CloseAndFlush();
            }
            
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
                WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostContext, builder) =>
                  {
                      if (hostContext.HostingEnvironment.IsDevelopment())
                      {
                          builder.AddUserSecrets<Program>();
                      }

                    
                      if (hostContext.HostingEnvironment.IsProduction())
                      {
                          var builtConfig = builder.Build();

                          var azureServiceTokenProvider = new AzureServiceTokenProvider();
                          var keyVaultClient = new KeyVaultClient(
                              new KeyVaultClient.AuthenticationCallback(
                                  azureServiceTokenProvider.KeyVaultTokenCallback));

                          builder.AddAzureKeyVault(
                              $"https://{builtConfig["KeyVaultName"]}.vault.azure.net/",
                              keyVaultClient,
                              new DefaultKeyVaultSecretManager());
                      }
                  })
                .UseSerilog()
                .UseStartup<Startup>();
        
    }
}
