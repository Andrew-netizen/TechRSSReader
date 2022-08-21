using TechRSSReader.Application.TodoLists.Commands.UpdateTodoList;
using TechRSSReader.Application.UnitTests.Common;
using TechRSSReader.Domain.Entities;
using Shouldly;
using Xunit;

namespace TechRSSReader.Application.UnitTests.TodoLists.Commands.UpdateTodoList
{
    public class UpdateTodoListCommandValidatorTests : CommandTestBase
    {
        [Fact]
        public async void IsValid_ShouldBeTrue_WhenListTitleIsUnique()
        {
            var command = new UpdateTodoListCommand
            {
                Id = 1,
                Title = "Shopping"
            };

            var validator = new UpdateTodoListCommandValidator(Context);

            var result = await validator.ValidateAsync(command);

            result.IsValid.ShouldBe(true);
        }

        [Fact]
        public async void IsValid_ShouldBeFalse_WhenListTitleIsNotUnique()
        {
            Context.TodoLists.Add(new TodoList { Title = "Shopping", CreatedBy = string.Empty });
            Context.SaveChanges();

            var command = new UpdateTodoListCommand
            {
                Id = 2,
                Title = "Shopping"
            };

            var validator = new UpdateTodoListCommandValidator(Context);

            var result = await validator.ValidateAsync(command);

            result.IsValid.ShouldBe(false);
        }
    }
}
