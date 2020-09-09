using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Queries.GetBlogs;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;
using TechRSSReader.Domain.ValueObjects;

namespace TechRSSReader.Application.Blogs.Commands.CreateBlog
{
    public class CreateBlogCommand: IRequest<BlogDto>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string XmlAddress { get; set; }

        public List<KeywordToExcludeDto> KeywordsToExclude { get; set; }

        public List<KeywordToIncludeDto> KeywordsToInclude { get; set; }

        public class CreateBlogCommandHandler : IRequestHandler<CreateBlogCommand, BlogDto>
        {

            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public CreateBlogCommandHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<BlogDto> Handle(CreateBlogCommand request, CancellationToken cancellationToken)
            {
                Blog blog = new Blog();
                blog.Title = request.Title;
                blog.XmlAddress = request.XmlAddress;

                foreach (KeywordToExcludeDto keywordToExclude in request.KeywordsToExclude)
                {
                    blog.KeywordsToExclude.Add(new KeywordToExclude { BlogId = blog.Id, Keyword = keywordToExclude.Keyword });

                }
                
                foreach (KeywordToIncludeDto keywordToInclude in request.KeywordsToInclude)
                {
                    blog.KeywordsToInclude.Add(new KeywordToInclude { BlogId = blog.Id, Keyword = keywordToInclude.Keyword });
                }

                _context.Blogs.Add(blog);
                await _context.SaveChangesAsync(cancellationToken);
               
                return _mapper.Map<BlogDto>(blog);
            }
        }

    }
}
