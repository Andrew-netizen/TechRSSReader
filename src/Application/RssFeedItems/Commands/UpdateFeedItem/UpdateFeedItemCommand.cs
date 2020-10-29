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
            private readonly IUserInterestPredictor _userInterestPredictor;
            private readonly ICurrentUserService _currentUserService; 

            public UpdateFeedItemCommandHandler(IApplicationDbContext context, IMapper mapper, IUserInterestPredictor userInterestPredictor, 
                                                ICurrentUserService currentUserService)
            {
                _context = context;
                _mapper = mapper;
                _userInterestPredictor = userInterestPredictor;
                _currentUserService = currentUserService;
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

                int objectsSaved = await _context.SaveChangesAsync(_currentUserService.UserId, cancellationToken);

                rssFeedItem = await _context.RssFeedItems
                       .Include(item => item.Blog)
                       .Where(item => item.Id == request.Id)
                       .FirstAsync(cancellationToken);
                                        
                if (!rssFeedItem.UserRatingPrediction.HasValue)
                {
                    float predictedStarRating = _userInterestPredictor.PredictStarRating(rssFeedItem);
                    rssFeedItem.UserRatingPrediction = predictedStarRating;
                }
                
                RssFeedItemDto result = _mapper.Map<RssFeedItemDto>(rssFeedItem);
                result.BlogTitle = rssFeedItem.Blog.Title;
                return result; 

            }
        }
    }
}
