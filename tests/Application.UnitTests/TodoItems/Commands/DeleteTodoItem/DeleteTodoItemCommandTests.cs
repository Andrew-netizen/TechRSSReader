﻿using TechRSSReader.Application.Common.Exceptions;
using TechRSSReader.Application.TodoItems.Commands.DeleteTodoItem;
using TechRSSReader.Application.UnitTests.Common;
using Shouldly;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace TechRSSReader.Application.UnitTests.TodoItems.Commands.DeleteTodoItem
{
    public class DeleteTodoItemCommandTests : CommandTestBase
    {
        [Fact]
        public async Task Handle_GivenValidId_ShouldRemovePersistedTodoItem()
        {
            var command = new DeleteTodoItemCommand
            {
                Id = 1
            };

            var handler = new DeleteTodoItemCommand.DeleteTodoItemCommandHandler(Context, CurrentUserService);

            await handler.Handle(command, CancellationToken.None);

            var entity = Context.TodoItems.Find(command.Id);

            entity.ShouldBeNull();
        }

        [Fact]
        public void Handle_GivenInvalidId_ThrowsException()
        {
            var command = new DeleteTodoItemCommand
            {
                Id = 99
            };

            var handler = new DeleteTodoItemCommand.DeleteTodoItemCommandHandler(Context, CurrentUserService);

            Should.ThrowAsync<NotFoundException>(() => 
                handler.Handle(command, CancellationToken.None));
        }
    }
}
