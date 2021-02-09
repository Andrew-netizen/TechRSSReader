using Ganss.XSS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;

namespace TechRSSReader.Infrastructure.Services
{
    public class HtmlSanitizationService : IHtmlSanitizationService
    {
        private static readonly HtmlSanitizer _htmlSanitizer = new HtmlSanitizer();
        

        public string Sanitize(string input)
        {
            return _htmlSanitizer.Sanitize(input);
        }
    }
}
