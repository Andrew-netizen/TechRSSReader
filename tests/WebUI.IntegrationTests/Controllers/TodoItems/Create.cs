using TechRSSReader.Application.TodoItems.Commands.CreateTodoItem;
using Shouldly;
using System.Net;
using System.Threading.Tasks;
using Xunit;

namespace TechRSSReader.WebUI.IntegrationTests.Controllers.TodoItems
{
    public class Create : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly CustomWebApplicationFactory<Startup> _factory;

        public Create(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task GivenValidCreateTodoItemCommand_ReturnsSuccessCode()
        {
            var client = await _factory.GetAuthenticatedClientAsync();

            var command = new CreateTodoItemCommand
            {
                Title = "Do yet another thing."
            };

            var content = IntegrationTestHelper.GetRequestContent(command);

            var response = await client.PostAsync($"/api/todoitems", content);

            response.EnsureSuccessStatusCode();
        }
               
    }
}
