import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromArticles from './articles.reducer';
import * as fromBlog from '../../blog/state/blog.reducer';
import {orderBy } from 'lodash';
import { RssFeedItemDto } from 'src/app/TechRSSReader-api';

// selector functions

const getArticlesFeatureState = createFeatureSelector<fromArticles.ArticlesState>('articles');

export const getExcludeAlreadyRead = createSelector(
  getArticlesFeatureState,
  state => state.excludeAlreadyRead
);

export const getFilterText = createSelector(
  getArticlesFeatureState,
  state => state.filterText
);

export const getKeywordExclusion = createSelector(
  getArticlesFeatureState,
  state => state.keywordExclusion
);

export const getDisplaySortOrder = createSelector(
  getArticlesFeatureState,
  state => state.displaySortOrder
);


export const getPageSize = createSelector(
  getArticlesFeatureState,
  state => state.pageSize
);

export const getFilteredArticles = createSelector(
  getExcludeAlreadyRead,
  getKeywordExclusion,
  getDisplaySortOrder,
  getFilterText,
  fromBlog.getFeedItems,
  fromBlog.getFeedItemSource,
  (excludeAlreadyRead, keywordExclusion, displaySortOrder, filterText, feedItems, feedItemSource) =>
  {

    var result = feedItems;

    if (excludeAlreadyRead)
    {
      result = result.filter(feedItem => !feedItem.readAlready);
    }

    if (feedItemSource === fromBlog.FeedItemSource.Bookmarked)
    {
      result = result.filter(feedItem => feedItem.bookmarked);
    }

    if (keywordExclusion)
    {
      result = result.filter(feedItem => !feedItem.excludedByKeyword);
    }

    if ((filterText) && (filterText.length > 0))
    {
      result = result.filter((feedItem: RssFeedItemDto) =>
        feedItem.title.toLocaleLowerCase().indexOf(filterText) !== -1);
    }

    if (displaySortOrder === fromArticles.DisplaySortOrder.PredictedRating)
      result = orderBy(result, ['userRatingPrediction'], ['desc']);
    if (displaySortOrder === fromArticles.DisplaySortOrder.PublishDateDesc)
      result = orderBy(result, ['publishingDate'], ['desc']);
    return result;
  }
);

export const getFilteredArticleCount = createSelector(
  getFilteredArticles,
  articles => articles.length
);

export const getPagesCount = createSelector(
  getFilteredArticleCount,
  getPageSize,
  (articleCount, pageSize) => Math.ceil(articleCount / pageSize)
);


// Don't allow the current Feed Item Page to be greater
// than the total page count
export const getCurrentFeedItemPage = createSelector(
  (fromBlog.getCurrentFeedItemPage),
  getPagesCount,
  (currentFeedItemPage, pageCount) => {
    if (currentFeedItemPage <= pageCount)
      return currentFeedItemPage;
    else
      return pageCount;
  }
);

export const getPaginatedArticles = createSelector(
    getFilteredArticles,
    getCurrentFeedItemPage,
    getPageSize,
    (articles, currentPage, pageSize) =>
      articles.slice((currentPage-1)*pageSize,currentPage*pageSize)
  );

export const getShowBlogTitle = createSelector(
  fromBlog.getFeedItemSource,
  source => (source === fromBlog.FeedItemSource.Bookmarked) || (source === fromBlog.FeedItemSource.Unread) || (source === fromBlog.FeedItemSource.TopRated)
);

