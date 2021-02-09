using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace TechRSSReader.Application.Blogs.Commands.UpdateBlog
{
    public class UpdateBlogCommandValidator: AbstractValidator<UpdateBlogCommand>
    {
        public UpdateBlogCommandValidator()
        {
            RuleFor(blog => blog.Title)
              .NotEmpty().WithMessage("Title is required")
              .MinimumLength(3).WithMessage("Title must be at least three characters")
              .MaximumLength(50).WithMessage("Title cannot exceed 50 characters")
              .Matches(@"^[ a-zA-Z0-9-']+$").WithMessage("Only letters, numbers and spaces in title");

            RuleFor(blog => blog.XmlAddress)
                .NotEmpty().WithMessage("Xml Address is required")
                .MinimumLength(5).WithMessage("Xml Address must be at least five characters.")
                .MaximumLength(100).WithMessage("Xml Address cannot exceed 100 characters.")
                .Matches(@"^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$").WithMessage("Xml Address must be a valid URL");
        }
    }
}
