using TechRSSReader.Application.Common.Interfaces;
using System;

namespace TechRSSReader.WebUI.IntegrationTests
{
    public class TestDateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}
