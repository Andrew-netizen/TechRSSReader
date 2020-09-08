using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Models;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.Common.Interfaces
{
    public interface IFeedReader
    {
        Task<FeedReadResult> ReadAsync(string uri, CancellationToken cancellationToken);
    }
}
