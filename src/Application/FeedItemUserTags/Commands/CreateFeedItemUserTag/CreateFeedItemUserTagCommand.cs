using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.RssFeedItems.Queries;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.FeedItemUserTags.Commands.CreateFeedItemUserTag
{
    public class CreateFeedItemUserTagCommand : IRequest<FeedItemUserTagDto>
    {
        public int RssFeedItemId { get; set; }

        public int UserTagId { get; set; }

        public class CreateFeedItemUserTagCommandHandler : IRequestHandler<CreateFeedItemUserTagCommand, FeedItemUserTagDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            private readonly ICurrentUserService _currentUserService;

            public CreateFeedItemUserTagCommandHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
            {
                _context = context;
                _mapper = mapper;
                _currentUserService = currentUserService;
            }

            public async Task<FeedItemUserTagDto> Handle(CreateFeedItemUserTagCommand request, CancellationToken cancellationToken)
            {
                FeedItemUserTag feedItemUserTag = new FeedItemUserTag
                {
                    RssFeedItemId = request.RssFeedItemId,
                    UserTagId = request.UserTagId
                };

                _context.FeedItemUserTags.Add(feedItemUserTag);

                await _context.SaveChangesAsync(_currentUserService.UserId, cancellationToken);

                feedItemUserTag = await _context.FeedItemUserTags
                                    .Include(item => item.UserTag)
                                    .Where(item => item.UserTagId == request.UserTagId)
                                    .Where(item => item.RssFeedItemId == request.RssFeedItemId)
                                    .FirstOrDefaultAsync(cancellationToken);

                return _mapper.Map<FeedItemUserTagDto>(feedItemUserTag);

            }
        }
    }
}
