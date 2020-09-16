using System;
using System.Collections.Generic;
using System.Text;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.Common.Interfaces
{
    public interface IUserInterestPredictor
    {
        public bool PredictUserInterest(RssFeedItem feedItem);
    }
}
