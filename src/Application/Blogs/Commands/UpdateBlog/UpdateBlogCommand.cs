using AutoMapper;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Blogs.Queries.GetBlogs;
using TechRSSReader.Application.Common.Exceptions;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Domain.Entities;
using TechRSSReader.Domain.ValueObjects;

namespace TechRSSReader.Application.Blogs.Commands.UpdateBlog
{
    public class UpdateBlogCommand: IRequest<BlogDto>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string XmlAddress { get; set; }

        public List<KeywordToExcludeDto> KeywordsToExclude { get; set; } = new List<KeywordToExcludeDto>();

        public List<KeywordToIncludeDto> KeywordsToInclude { get; set; } = new List<KeywordToIncludeDto>();

        public class UpdateBlogCommandHandler : IRequestHandler<UpdateBlogCommand, BlogDto>
        {
            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            private readonly ICurrentUserService _currentUserService;
            
            public UpdateBlogCommandHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
            {
                _context = context;
                _mapper = mapper;
                _currentUserService = currentUserService;
            }

            public async Task<BlogDto> Handle(UpdateBlogCommand request, CancellationToken cancellationToken)
            {
                Blog blog = await _context.Blogs.FindAsync(request.Id);

                if (blog == null)
                {
                    throw new NotFoundException(nameof(Blog), request.Id);
                }

                blog.Title = request.Title;
                blog.XmlAddress = request.XmlAddress;

                blog.KeywordsToExclude.Clear();
                foreach (KeywordToExcludeDto keywordToExclude in request.KeywordsToExclude)
                {
                    blog.KeywordsToExclude.Add(new KeywordToExclude { BlogId = blog.Id, Keyword = keywordToExclude.Keyword });
                    
                }

                blog.KeywordsToInclude.Clear();

                foreach (KeywordToIncludeDto keywordToInclude in request.KeywordsToInclude)
                {
                    blog.KeywordsToInclude.Add(new KeywordToInclude { BlogId = blog.Id, Keyword = keywordToInclude.Keyword });
                }

                _context.Blogs.Update(blog);
                await _context.SaveChangesAsync(_currentUserService.UserId, cancellationToken);

                // Update the ExcludedByKeyword flag for all associated feed items.
                // This is necessary because we've just updated the list of keywords for the blog.

                List<RssFeedItem> feedItems = _context.RssFeedItems
                                                    .Where(item => item.BlogId == blog.Id)
                                                    .ToList();
                foreach (RssFeedItem feedItem in feedItems)
                {
                    feedItem.ExcludedByKeyword = feedItem.ContainsExcludedKeywords(blog);
                    _context.RssFeedItems.Update(feedItem);
                    await _context.SaveChangesAsync(_currentUserService.UserId, cancellationToken);
                }
                
                

                return _mapper.Map<BlogDto>(blog);
            }

        }
    }
}
