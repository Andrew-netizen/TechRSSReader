using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace TechRSSReader.Application.RssFeedItems.Commands.UpdateFeedItem
{
    public class UpdateFeedItemCommandValidator: AbstractValidator<UpdateFeedItemCommand>
    {
        public UpdateFeedItemCommandValidator()
        {

            RuleFor(v => v.UserRating)
                .InclusiveBetween(1, 5)
                .When(v => v.UserRating.HasValue);
        }

    }
}
