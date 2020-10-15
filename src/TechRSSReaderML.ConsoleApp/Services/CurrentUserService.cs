using Dapper;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Infrastructure.Persistence;

namespace TechRSSReaderML.ConsoleApp.Services
{
    class CurrentUserService : ICurrentUserService
    {

        private string userId { get; set; }
        private IConfiguration _configuration;

        public CurrentUserService(IConfiguration configuration)
        {
            _configuration = configuration; 
        }

        private string GetUserId()
        {
            string result = null;
            string connectionString = _configuration.GetConnectionString("DefaultConnection");
            using (var connection = new SqlConnection(connectionString))
            {
                 result = connection.ExecuteScalar<string>($"SELECT Id FROM AspNetUsers WHERE UserName= '{ApplicationDbContextSeed.MLConsoleAppUserName}';");
            }
            return result; 
        }

        public string UserId
        {
            get
            {
                if (userId == null)
                    userId = GetUserId();
                return userId;
            }
        }
    }
}
