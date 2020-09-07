using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;

namespace TechRSSReader.Application.Blogs.Queries.GetBlogs
{
    public class GetBlogsQuery : IRequest<BlogsViewModel>
    {
        public class GetBlogsQueryHandler : IRequestHandler<GetBlogsQuery, BlogsViewModel>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;

            public GetBlogsQueryHandler(IApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<BlogsViewModel> Handle(GetBlogsQuery request, CancellationToken cancellationToken)
            {
                var viewModel = new BlogsViewModel();

                viewModel.Blogs = await _context.Blogs
                    .ProjectTo<BlogDto>(_mapper.ConfigurationProvider)
                    .OrderBy(t => t.Title)
                    .ToListAsync(cancellationToken);

                return viewModel;
            }
        }
    }
}
