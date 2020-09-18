using AutoMapper;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.ML;
using System;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;
using TechRSSReaderML.Model;

namespace TechRSSReader.Infrastructure.InterestPredictor
{
    public class UserInterestPredictor : IUserInterestPredictor
    {
        private readonly IMapper _mapper;
        private readonly PredictionEnginePool<StarRatingInput, StarRatingOutput> _predictionEnginePool;
        private readonly ILogger<UserInterestPredictor> _logger;
        
        public UserInterestPredictor(IMapper mapper, PredictionEnginePool<StarRatingInput, StarRatingOutput> predictionEnginePool, 
                ILogger<UserInterestPredictor> logger)
        {
            _mapper = mapper;
            _predictionEnginePool = predictionEnginePool;
            _logger = logger; 
        }

        public float PredictStarRating(RssFeedItem feedItem)
        {
            float result = 0;

            try
            {
                StarRatingInput data = _mapper.Map<StarRatingInput>(feedItem);
                StarRatingOutput prediction = _predictionEnginePool.Predict(modelName: "StarRatingAnalysisModel", example: data);
                result = prediction.Score;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return result; 
        }
              
    }
}
