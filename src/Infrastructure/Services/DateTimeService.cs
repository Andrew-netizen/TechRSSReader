using TechRSSReader.Application.Common.Interfaces;
using System;

namespace TechRSSReader.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}
