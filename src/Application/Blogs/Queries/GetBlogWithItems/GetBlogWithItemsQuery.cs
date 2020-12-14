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
    public class GetBlogWithItemsQuery: IRequest<BlogDetailsDto>
    {
        public int Id { get; set; }

        public class GetBlogWithItemsQueryHandler : IRequestHandler<GetBlogWithItemsQuery, BlogDetailsDto>
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

            public async Task<BlogDetailsDto> Handle(GetBlogWithItemsQuery request, CancellationToken cancellationToken)
            {
                Blog blog = await _context.Blogs
                    .Where(blog => blog.Id == request.Id)
                    .AsNoTracking()
                    .Select(b => new Blog
                    {
                        Id = b.Id, 
                        Title = b.Title,
                        XmlAddress = b.XmlAddress,
                        KeywordsToExclude = b.KeywordsToExclude, 
                        KeywordsToInclude = b.KeywordsToInclude, 
                        RssFeedItems = b.RssFeedItems.Select(r => new RssFeedItem
                        {
                            Id = r.Id,
                            Author = r.Author,
                            BlogId = r.BlogId,
                            Bookmarked = r.Bookmarked,
                            Categories = r.Categories,
                            ExcludedByKeyword = r.ExcludedByKeyword,
                            Link = r.Link,
                            PublishingDate = r.PublishingDate,
                            PublishingDateString = r.PublishingDateString,
                            ReadAlready = r.ReadAlready,
                            RetrievedDateTime = r.RetrievedDateTime,
                            RssId = r.RssId,
                            Title = r.Title,
                            UserRatedDate = r.UserRatedDate,
                            UserRating = r.UserRating,
                            UserRatingPrediction = r.UserRatingPrediction,
                            UserReadDate = r.UserReadDate
                        }).ToList()
                    })
                    .FirstOrDefaultAsync(cancellationToken);

                blog.RssFeedItems = blog.RssFeedItems
                    .OrderBy(feedItem => feedItem.ReadAlready)
                    .ThenByDescending(feedItem => feedItem.PublishingDate.HasValue ? feedItem.PublishingDate.Value : feedItem.Created).Take(100).ToList();

                foreach (RssFeedItem feedItem in blog.RssFeedItems)
                {
                    if (!feedItem.UserRatingPrediction.HasValue)
                    {
                        float predictedStarRating = _userInterestPredictor.PredictStarRating(feedItem);
                        feedItem.UserRatingPrediction = predictedStarRating;
                    }
                }

                return _mapper.Map<BlogDetailsDto>(blog);
            }
        }

    }
}
