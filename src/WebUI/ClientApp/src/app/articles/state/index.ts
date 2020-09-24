import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromArticles from './articles.reducer';
import * as fromBlog from '../../blog/state/blog.reducer';
import { BlogDto, RssFeedItemDto } from 'src/app/techrssreader-api';
import {orderBy } from 'lodash';

export interface State extends fromRoot.State {
  articles: fromArticles.ArticlesState;
}

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

export const getFilteredArticles = createSelector(
  getExcludeAlreadyRead,
  getKeywordExclusion,
  getDisplaySortOrder,
  fromBlog.getCurrentBlog,
  fromBlog.getCurrentBlogFeedItems,
  (excludeAlreadyRead, keywordExclusion, displaySortOrder, blog, feedItems) =>
  {

    var result = feedItems;
    if (excludeAlreadyRead)
    {
      result = result.filter(feedItem => !feedItem.readAlready);
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
