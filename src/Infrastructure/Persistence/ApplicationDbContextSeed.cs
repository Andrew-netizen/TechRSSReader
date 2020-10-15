using TechRSSReader.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace TechRSSReader.Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {

        public const string MLConsoleAppUserName = "TechRSSReader_MLConsoleApp";

        public static async Task SeedAsync(UserManager<ApplicationUser> userManager)
        {
            var defaultUser = new ApplicationUser { UserName = MLConsoleAppUserName, Email = "consoleApp@smartrssreader" };

            if (userManager.Users.All(u => u.Id != defaultUser.Id))
            {
                IdentityResult result = await userManager.CreateAsync(defaultUser, "TechRSSReader1!");
            }
        }
    }
}
