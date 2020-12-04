using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;

namespace TechRSSReader.Application.UserTags.Queries.GetUserTags
{
    public class GetUserTagsQuery : IRequest<UserTagsViewModel>
    {

        public class GetUserTagsQueryHandler : IRequestHandler<GetUserTagsQuery, UserTagsViewModel>
        {

            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            private readonly ICurrentUserService _currentUserService;
            private readonly ILogger<GetUserTagsQueryHandler> _logger; 

            public GetUserTagsQueryHandler(IApplicationDbContext context, IMapper mapper,
                ICurrentUserService currentUserService, 
                ILogger<GetUserTagsQueryHandler> logger)
            {
                _context = context;
                _mapper = mapper;
                _currentUserService = currentUserService;
                _logger = logger; 
            }

            public async Task<UserTagsViewModel> Handle(GetUserTagsQuery request, CancellationToken cancellationToken)
            {
                UserTagsViewModel viewModel = new UserTagsViewModel();

                try
                {
                    List<UserTagDto> userTags = await _context.UserTags
                        .Where(tag => tag.CreatedBy == _currentUserService.UserId)
                        .ProjectTo<UserTagDto>(_mapper.ConfigurationProvider)
                        .OrderBy(t => t.Text)
                        .AsNoTracking()
                        .ToListAsync(cancellationToken);
                    viewModel.UserTags = userTags;
                }
                catch (Exception exception)
                {
                    _logger.LogError($"Exception in GetUserTagsQueryHandler: {exception.Message}, Stack Trace: {exception.StackTrace}");
                }

                return viewModel;
            }
        }
    }
}
