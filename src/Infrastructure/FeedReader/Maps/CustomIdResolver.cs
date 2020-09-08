using AutoMapper;
using CodeHollow.FeedReader;
using System;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Infrastructure.FeedReader.Maps
{
    public class CustomIdResolver : IValueResolver<FeedItem, RssFeedItem, int>
    {
        public int Resolve(FeedItem source, RssFeedItem destination, int destMember, ResolutionContext context)
        {
            return 0;
        }
    }
}
