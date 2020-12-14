import { PublishingDatePipe } from "../shared/publishingdate.pipe";
import { WeeklyBlogSummaryDto } from "../TechRSSReader-api";

export class NameValueData {
  constructor(public name: string, public value: string) {}
}

export function mapChartData(
  weeklyBlogSummaries: WeeklyBlogSummaryDto[],
  publishingDatePipe: PublishingDatePipe
): Object[] {
  return [
    mapNewArticlesChartData(weeklyBlogSummaries, publishingDatePipe),
    mapReadArticlesChartData(weeklyBlogSummaries, publishingDatePipe),
    mapLikedArticlesChartData(weeklyBlogSummaries, publishingDatePipe),
  ];
}

export function mapNewArticlesChartData(
  weeklyBlogSummaries: WeeklyBlogSummaryDto[],
  publishingDatePipe: PublishingDatePipe
): Object {
  const newArticlesData = new Array<NameValueData>();
  for (let index = 0; index < weeklyBlogSummaries.length; index++) {
    const weeklyBlogSummary = weeklyBlogSummaries[index];
    const newValue = new NameValueData(
      publishingDatePipe.transform(weeklyBlogSummary.weekBegins),
      weeklyBlogSummary.newNotExcluded.toString()
    );
    newArticlesData.unshift(newValue);
  }
  return { name: "New", series: newArticlesData };
}

export function mapReadArticlesChartData(
  weeklyBlogSummaries: WeeklyBlogSummaryDto[],
  publishingDatePipe: PublishingDatePipe
): Object {
  const readArticlesData = new Array<NameValueData>();
  for (let index = 0; index < weeklyBlogSummaries.length; index++) {
    const weeklyBlogSummary = weeklyBlogSummaries[index];
    const newValue = new NameValueData(
      publishingDatePipe.transform(weeklyBlogSummary.weekBegins),
      weeklyBlogSummary.itemsRead.toString()
    );
    readArticlesData.unshift(newValue);
  }
  return { name: "You Read", series: readArticlesData };
}

export function mapLikedArticlesChartData(
  weeklyBlogSummaries: WeeklyBlogSummaryDto[],
  publishingDatePipe: PublishingDatePipe
): Object {
  const likedArticlesData = new Array<NameValueData>();
  for (let index = 0; index < weeklyBlogSummaries.length; index++) {
    const weeklyBlogSummary = weeklyBlogSummaries[index];
    const newValue = new NameValueData(
      publishingDatePipe.transform(weeklyBlogSummary.weekBegins),
      weeklyBlogSummary.itemsRatedAtLeastThree.toString()
    );
    likedArticlesData.unshift(newValue);
  }
  return { name: "You Liked", series: likedArticlesData };

}
