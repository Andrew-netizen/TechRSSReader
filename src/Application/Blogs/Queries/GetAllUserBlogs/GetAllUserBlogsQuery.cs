using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.Blogs.Queries.GetAllUserBlogs
{
    public class GetAllUserBlogsQuery : IRequest<IList<Blog>>
    {
        public class GetAllUserBlogsQueryHandler : IRequestHandler<GetAllUserBlogsQuery, IList<Blog>>
        {

            private readonly IApplicationDbContext _context;

            public GetAllUserBlogsQueryHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<IList<Blog>> Handle(GetAllUserBlogsQuery request, CancellationToken cancellationToken)
            {
                
                return await _context.Blogs
                    .AsNoTracking()
                    .Select(b => new Blog
                    {
                        Id = b.Id,
                        Title = b.Title,
                        XmlAddress = b.XmlAddress
                    })
                    .ToListAsync(cancellationToken);
            }
        }
    }
}
