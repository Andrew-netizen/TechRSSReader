using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Exceptions;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.RssFeedItems.Commands.UpdateUserInterested
{
    public class UpdateUserInterestedCommand: IRequest<bool>
    {
        public int Id { get; set; }

        public bool UserInterested { get; set; }

        public class UpdateUserInterestedCommandHandler : IRequestHandler<UpdateUserInterestedCommand, bool>
        {
            private readonly IApplicationDbContext _context;

            public UpdateUserInterestedCommandHandler(IApplicationDbContext context)
            {
                _context = context; 
            }

            public async Task<bool> Handle(UpdateUserInterestedCommand request, CancellationToken cancellationToken)
            {
                RssFeedItem rssFeedItem = _context.RssFeedItems.Find(request.Id);

                if (rssFeedItem == null)
                    throw new NotFoundException(nameof(RssFeedItem), request.Id);

                rssFeedItem.UserInterested = request.UserInterested;
                rssFeedItem.ReadAlready = true;

                _context.RssFeedItems.Update(rssFeedItem);
                int objectsSaved = await _context.SaveChangesAsync(cancellationToken);

                return (objectsSaved > 0);
            }
        }
    }
}
