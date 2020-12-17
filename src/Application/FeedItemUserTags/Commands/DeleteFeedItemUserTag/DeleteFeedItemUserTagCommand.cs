using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Exceptions;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.RssFeedItems.Queries;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.FeedItemUserTags.Commands.DeleteFeedItemUserTag
{
    public class DeleteFeedItemUserTagCommand : IRequest<FeedItemUserTagDto>
    {

        public int RssFeedItemId { get; set; }

        public int UserTagId { get; set; }

        public class DeleteFeedItemUserTagCommandHandler : IRequestHandler<DeleteFeedItemUserTagCommand, FeedItemUserTagDto>
        {

            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            private readonly ICurrentUserService _currentUserService;


            public DeleteFeedItemUserTagCommandHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
            {
                _context = context;
                _mapper = mapper;
                _currentUserService = currentUserService;
            }

            public async Task<FeedItemUserTagDto> Handle(DeleteFeedItemUserTagCommand request, CancellationToken cancellationToken)
            {
                var entity = await _context.FeedItemUserTags
                                .Include(item => item.RssFeedItem)
                                .Include(item => item.UserTag)
                                .Where(item => item.RssFeedItemId == request.RssFeedItemId)
                                .Where(item => item.UserTagId == request.UserTagId)
                                .FirstOrDefaultAsync(cancellationToken);

                if (entity == null)
                {
                    throw new NotFoundException(nameof(FeedItemUserTag), (request.RssFeedItemId, request.UserTagId));
                }

                if ((entity.RssFeedItem.CreatedBy != _currentUserService.UserId) || 
                    (entity.UserTag.CreatedBy != _currentUserService.UserId))
                {
                    throw new NotFoundException(nameof(FeedItemUserTag), (request.RssFeedItemId, request.UserTagId));
                }

                _context.FeedItemUserTags.Remove(entity);

                await _context.SaveChangesAsync(_currentUserService.UserId, cancellationToken);

                return _mapper.Map<FeedItemUserTagDto>(entity);
            }
        }
    }
}
