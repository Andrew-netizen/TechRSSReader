using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace TechRSSReader.Application.TodoLists.Commands.CreateTodoList
{
    public partial class CreateTodoListCommand : IRequest<int>
    {
        public string Title { get; set; }

        public class CreateTodoListCommandHandler : IRequestHandler<CreateTodoListCommand, int>
        {
            private readonly IApplicationDbContext _context;
            private readonly ICurrentUserService _currentUserService;

            public CreateTodoListCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
            {
                _context = context;
                _currentUserService = currentUserService;
            }

            public async Task<int> Handle(CreateTodoListCommand request, CancellationToken cancellationToken)
            {
                var entity = new TodoList();

                entity.Title = request.Title;

                _context.TodoLists.Add(entity);

                await _context.SaveChangesAsync(_currentUserService.UserId, cancellationToken);

                return entity.Id;
            }
        }
    }
}
