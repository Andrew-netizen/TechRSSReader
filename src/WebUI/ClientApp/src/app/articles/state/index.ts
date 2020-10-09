import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromArticles from './articles.reducer';
import * as fromBlog from '../../blog/state/blog.reducer';
import { BlogDto, RssFeedItemDto } from 'src/app/techrssreader-api';
import {orderBy } from 'lodash';

// selector functions

const getArticlesFeatureState = createFeatureSelector<fromArticles.ArticlesState>('articles');

export const getExcludeAlreadyRead = createSelector(
  getArticlesFeatureState,
  state => state.excludeAlreadyRead
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
  fromBlog.getCurrentBlog,
  fromBlog.getFeedItems,
  fromBlog.getFeedItemSource,
  (excludeAlreadyRead, keywordExclusion, displaySortOrder, blog, feedItems, feedItemSource) =>
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

    if (keywordExclusion && blog)
    {
      result = result.filter(feedItem => !ContainsExcludedKeywords(blog, feedItem));
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


function ContainsExcludedKeywords(blog: BlogDto, feedItem: RssFeedItemDto): boolean {
  var hasExcludedKeyword: boolean;
  hasExcludedKeyword = false;
  if (!blog.keywordsToExclude || !feedItem.categories)
  {
    return hasExcludedKeyword;
  }

  var keywordIndex: number;
  keywordIndex = 0;
  while (keywordIndex < blog.keywordsToExclude.length)
  {
      var regularExpression = new RegExp(blog.keywordsToExclude[keywordIndex].keyword, "gi");
      if (feedItem.categories.search(regularExpression)!= -1)
      {
        hasExcludedKeyword = true;
        break;
      }
      keywordIndex++;
  }

  return hasExcludedKeyword;
}
