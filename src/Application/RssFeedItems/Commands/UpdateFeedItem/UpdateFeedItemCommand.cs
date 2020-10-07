using AutoMapper;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Exceptions;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.RssFeedItems.Queries;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.RssFeedItems.Commands.UpdateFeedItem
{
    public class UpdateFeedItemCommand: IRequest<RssFeedItemDto>
    {
        public int Id { get; set; }

        public bool Bookmarked { get; set; }

        public bool ReadAlready { get; set; }

        public int? UserRating { get; set; }

        public class UpdateFeedItemCommandHandler : IRequestHandler<UpdateFeedItemCommand, RssFeedItemDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper; 

            public UpdateFeedItemCommandHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper; 
            }

            public async Task<RssFeedItemDto> Handle(UpdateFeedItemCommand request, CancellationToken cancellationToken)
            {
                RssFeedItem rssFeedItem = _context.RssFeedItems.Find(request.Id);

                if (rssFeedItem == null)
                    throw new NotFoundException(nameof(RssFeedItem), request.Id);

                rssFeedItem.ReadAlready = request.ReadAlready;
                rssFeedItem.UserRating = request.UserRating;
                rssFeedItem.Bookmarked = request.Bookmarked; 

                _context.RssFeedItems.Update(rssFeedItem);

                int objectsSaved = await _context.SaveChangesAsync(cancellationToken);


                return _mapper.Map<RssFeedItemDto>(_context.RssFeedItems.Find(request.Id));
            }
        }
    }
}
