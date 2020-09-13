using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Queries.GetBlogs;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.Blogs.Queries.GetBlogWithItems
{
    public class GetBlogWithItemsQuery: IRequest<BlogDto>
    {
        public int Id { get; set; }

        public class GetBlogWithItemsQueryHandler : IRequestHandler<GetBlogWithItemsQuery, BlogDto>
        {

            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public GetBlogWithItemsQueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper; 
            }

            public async Task<BlogDto> Handle(GetBlogWithItemsQuery request, CancellationToken cancellationToken)
            {
                Blog blog = await _context.Blogs
                    .Include(blog => blog.RssFeedItems)
                    .Where(blog => blog.Id == request.Id)
                    .FirstOrDefaultAsync(cancellationToken);

                return _mapper.Map<BlogDto>(blog);
            }
        }

    }
}
