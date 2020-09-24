using System;
using System.Collections.Generic;
using System.Text;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.UnitTests
{
    class StubUserInterestPredictor : IUserInterestPredictor
    {
        public float PredictStarRating(RssFeedItem feedItem)
        {
            return 1.5F; 
        }
             
    }
}
