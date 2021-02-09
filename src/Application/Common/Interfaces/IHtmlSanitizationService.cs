using System;
using System.Collections.Generic;
using System.Text;

namespace TechRSSReader.Application.Common.Interfaces
{
    public interface IHtmlSanitizationService
    {
        public string Sanitize(string input);
    }
}
