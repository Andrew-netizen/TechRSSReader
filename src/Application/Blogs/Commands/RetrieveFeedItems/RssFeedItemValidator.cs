using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.Blogs.Commands.RetrieveFeedItems
{
    internal class RssFeedItemValidator: AbstractValidator<RssFeedItem>
    {
        public RssFeedItemValidator()
        {
            RuleFor(feedItem => feedItem.Author).MaximumLength(200);
            RuleFor(feedItem => feedItem.Categories).MaximumLength(200);
            RuleFor(feedItem => feedItem.Link).MaximumLength(1000);
            RuleFor(feedItem => feedItem.PublishingDateString).MaximumLength(100);
            RuleFor(feedItem => feedItem.RssId).MaximumLength(500);
            RuleFor(feedItem => feedItem.Title).MaximumLength(500);
        }
    }
}
