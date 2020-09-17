using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
            private readonly IUserInterestPredictor _userInterestPredictor;

            public GetBlogWithItemsQueryHandler(IApplicationDbContext context, IMapper mapper, IUserInterestPredictor userInterestPredictor)
            {
                _context = context;
                _mapper = mapper;
                _userInterestPredictor = userInterestPredictor;
            }

            public async Task<BlogDto> Handle(GetBlogWithItemsQuery request, CancellationToken cancellationToken)
            {
                Blog blog = await _context.Blogs
                    .Include(blog => blog.RssFeedItems)
                    .Where(blog => blog.Id == request.Id)
                    .FirstOrDefaultAsync(cancellationToken);

                blog.RssFeedItems = blog.RssFeedItems.OrderByDescending(feedItem => feedItem.PublishingDate).ToList();

                foreach (RssFeedItem feedItem in blog.RssFeedItems)
                {
                    feedItem.UserInterestPrediction = _userInterestPredictor.PredictUserInterest(feedItem);
                }

                return _mapper.Map<BlogDto>(blog);
            }
        }

    }
}
