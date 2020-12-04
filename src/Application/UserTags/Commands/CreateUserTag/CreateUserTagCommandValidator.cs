using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;

namespace TechRSSReader.Application.UserTags.Commands.CreateUserTag
{
    public class CreateUserTagCommandValidator : AbstractValidator<CreateUserTagCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public CreateUserTagCommandValidator(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService; 

            RuleFor(v => v.Text)
                .NotEmpty().WithMessage("Tag is required.")
                .MaximumLength(100).WithMessage("Tag text must not exceed 100 characters.")
                .MustAsync(BeUniqueText).WithMessage("The specified tag already exists.");
        }

        public async Task<bool> BeUniqueText(string text, CancellationToken cancellationToken)
        {
            return await _context.UserTags
                .AllAsync(l => (l.Text != text) || (l.CreatedBy != _currentUserService.UserId));
        }
    }
}
