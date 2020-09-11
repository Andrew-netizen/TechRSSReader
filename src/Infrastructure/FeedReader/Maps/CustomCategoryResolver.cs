using AutoMapper;
using CodeHollow.FeedReader;
using CodeHollow.FeedReader.Feeds;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Infrastructure.FeedReader.Maps
{
    public class CustomCategoryResolver: IValueResolver<FeedItem, RssFeedItem, string>
    {
        
        public string Resolve(FeedItem source, RssFeedItem destination, string destMember, ResolutionContext context)
        {
            if (source.Categories != null && source.Categories.Count > 0)
            {
                return string.Join(',', source.Categories.ToArray());
            }
            else
            {
                if (source.SpecificItem.GetType().Equals(typeof(Rss10FeedItem)))
                {
                    Rss10FeedItem feedItem = (Rss10FeedItem)source.SpecificItem;
                    DublinCore dublinCore = feedItem.DC;
                    return dublinCore.Subject;
                }
                else
                    return string.Empty;

            }
        }
    }
}
