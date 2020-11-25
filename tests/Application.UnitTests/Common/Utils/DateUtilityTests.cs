using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using TechRSSReader.Application.Common.Utils;
using Shouldly;

namespace TechRSSReader.Application.UnitTests.Common.Utils
{
    public class DateUtilityTests
    {
        [Fact]
        public void GetLastMonday()
        {
            DateTime thisWednesday = new DateTime(2020, 11, 25);
            DateTime lastMonday = new DateTime(2020, 11, 16);
            DateTime result = DateUtility.GetLastMonday(thisWednesday);
            result.ShouldBe(lastMonday); 

        }

        [Fact]
        public void GetLastMondayWeekAgo()
        {
            DateTime lastWednesday = new DateTime(2020, 11, 18);
            DateTime lastMonday = new DateTime(2020, 11, 9);
            DateTime result = DateUtility.GetLastMonday(lastWednesday);
            result.ShouldBe(lastMonday);

        }

        [Fact]
        public void GetLastMondayOnMonday()
        {
            DateTime today = new DateTime(2020, 11, 23);
            DateTime lastMonday = new DateTime(2020, 11, 16);
            DateTime result = DateUtility.GetLastMonday(today);
            result.ShouldBe(lastMonday);

        }

        [Fact]
        public void GetLastMondayOnSunday()
        {
            DateTime today = new DateTime(2020, 11, 22);
            DateTime lastMonday = new DateTime(2020, 11, 9);
            DateTime result = DateUtility.GetLastMonday(today);
            result.ShouldBe(lastMonday);

        }
    }
}
