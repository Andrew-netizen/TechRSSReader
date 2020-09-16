using System;
using System.Collections.Generic;
using System.Text;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.UnitTests
{
    class StubUserInterestPredictor : IUserInterestPredictor
    {
        public bool PredictUserInterest(RssFeedItem feedItem)
        {
            return false; 
        }
    }
}
