using TechRSSReader.Application.TodoLists.Commands.CreateTodoList;
using TechRSSReader.Application.UnitTests.Common;
using TechRSSReader.Domain.Entities;
using Shouldly;
using Xunit;

namespace TechRSSReader.Application.UnitTests.TodoLists.Commands.CreateTodoList
{
    public class UpdateTodoListCommandValidatorTests : CommandTestBase
    {
        [Fact]
        public async void IsValid_ShouldBeTrue_WhenListTitleIsUnique()
        {
            var command = new CreateTodoListCommand
            {
                Title = "Bucket List"
            };

            var validator = new CreateTodoListCommandValidator(Context);

            var result = await validator.ValidateAsync(command);

            result.IsValid.ShouldBe(true);
        }

        [Fact]
        public async void IsValid_ShouldBeFalse_WhenListTitleIsNotUnique()
        {
            Context.TodoLists.Add(new TodoList { Title = "Shopping", CreatedBy = string.Empty });
            Context.SaveChanges();

            var command = new CreateTodoListCommand
            {
                Title = "Shopping"
            };

            var validator = new CreateTodoListCommandValidator(Context);

            var result = await validator.ValidateAsync(command);

            result.IsValid.ShouldBe(false);
        }
    }
}
