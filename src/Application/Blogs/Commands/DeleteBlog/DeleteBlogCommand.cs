using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Exceptions;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.Blogs.Commands.DeleteBlog
{
    public class DeleteBlogCommand: IRequest<int>
    {
        public int Id { get; set; }

        public class DeleteBlogCommandHandler : IRequestHandler<DeleteBlogCommand, int>
        {
            private readonly IApplicationDbContext _context;

            public DeleteBlogCommandHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(DeleteBlogCommand request, CancellationToken cancellationToken)
            {
                var blog = await _context.Blogs
                   .Where(b => b.Id == request.Id)
                   .SingleOrDefaultAsync(cancellationToken);

                if (blog == null)
                {
                    throw new NotFoundException(nameof(Blog), request.Id);
                }

                _context.Blogs.Remove(blog);

                int deletedObjectCount = await _context.SaveChangesAsync(cancellationToken);

                if (deletedObjectCount > 0)
                    return request.Id;
                else
                    return 0;
                
            }
        }
    }
}
