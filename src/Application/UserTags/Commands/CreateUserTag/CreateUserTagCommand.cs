using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.UserTags.Queries.GetUserTags;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.UserTags.Commands.CreateUserTag
{
    public class CreateUserTagCommand : IRequest<UserTagDto>
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public class CreateUserTagCommandHandler : IRequestHandler<CreateUserTagCommand, UserTagDto>
        {

            private readonly IApplicationDbContext _context;
            private readonly IMapper _mapper;
            private readonly ICurrentUserService _currentUserService;

            public CreateUserTagCommandHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
            {
                _context = context;
                _mapper = mapper;
                _currentUserService = currentUserService;
            }

            public async Task<UserTagDto> Handle(CreateUserTagCommand request, CancellationToken cancellationToken)
            {
                UserTag userTag = new UserTag
                {
                    Text = request.Text
                };

                _context.UserTags.Add(userTag);
                await _context.SaveChangesAsync(_currentUserService.UserId, cancellationToken);

                return _mapper.Map<UserTagDto>(userTag);
            }
        }
    }
}
