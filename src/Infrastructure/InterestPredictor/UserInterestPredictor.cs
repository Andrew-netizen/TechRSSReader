using AutoMapper;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.ML;
using System;
using System.Collections.Generic;
using System.Text;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;
using TechRSSReaderML.Model;

namespace TechRSSReader.Infrastructure.InterestPredictor
{
    public class UserInterestPredictor : IUserInterestPredictor
    {
        private readonly IMapper _mapper;
        private readonly PredictionEnginePool<UserInterestInput, UserInterestOutput> _predictionEnginePool;
        private readonly ILogger<UserInterestPredictor> _logger; 

        public UserInterestPredictor(IMapper mapper, PredictionEnginePool<UserInterestInput, UserInterestOutput> predictionEnginePool, 
                ILogger<UserInterestPredictor> logger)
        {
            _mapper = mapper;
            _predictionEnginePool = predictionEnginePool;
            _logger = logger; 
        }

        public bool PredictUserInterest(RssFeedItem feedItem)
        {

            bool result = false; 
            
            try
            {
                UserInterestInput data = _mapper.Map<UserInterestInput>(feedItem);
                UserInterestOutput prediction = _predictionEnginePool.Predict<UserInterestInput, UserInterestOutput>(modelName: "UserInterestAnalysisModel", example: data);
                result = Convert.ToBoolean(prediction.Prediction);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return result;

        }
    }
}
