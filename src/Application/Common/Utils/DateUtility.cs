using System;
using System.Collections.Generic;
using System.Text;

namespace TechRSSReader.Application.Common.Utils
{
    public static class DateUtility
    {
        public static DateTime GetLastMonday(DateTime dateTime)
        {
            int daysUntilMonday = ((int)DayOfWeek.Sunday - (int)dateTime.DayOfWeek + 7) % 7 + 1;
            int daysUntilLastMonday = daysUntilMonday - 14;
            return dateTime.AddDays(daysUntilLastMonday);
        }
    }
}
