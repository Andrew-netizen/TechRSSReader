﻿using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.RssFeedItems.Commands.UpdateRatingPredictions
{
    public class UpdateRatingPredictionsCommand: IRequest
    {

        public class UpdateRatingPredictionsCommandHandler : IRequestHandler<UpdateRatingPredictionsCommand>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            private readonly IUserInterestPredictor _userInterestPredictor;
            private readonly ICurrentUserService _currentUserService; 

            public UpdateRatingPredictionsCommandHandler(IApplicationDbContext context, 
                IMapper mapper, IUserInterestPredictor userInterestPredictor, ICurrentUserService currentUserService)
            {
                _context = context;
                _mapper = mapper;
                _userInterestPredictor = userInterestPredictor;
                _currentUserService = currentUserService;
            }

            public async Task<Unit> Handle(UpdateRatingPredictionsCommand request, CancellationToken cancellationToken)
            {
                List<RssFeedItem> rssFeedItems = await _context.RssFeedItems.ToListAsync();

                foreach (RssFeedItem rssFeedItem in rssFeedItems)
                {
                    float predictedStarRating = _userInterestPredictor.PredictStarRating(rssFeedItem);
                    rssFeedItem.UserRatingPrediction = predictedStarRating;
                    _context.RssFeedItems.Update(rssFeedItem);
                }

                await _context.SaveChangesAsync(_currentUserService.UserId, cancellationToken);

                return default;
            }
        }
    }
}
