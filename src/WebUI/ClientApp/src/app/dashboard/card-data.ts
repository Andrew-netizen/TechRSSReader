import { BlogDto, WeeklyBlogSummaryDto } from "../TechRSSReader-api";

export class CardData {
  constructor(public name: string, public value: string) {}
}

export class BlogCardData {
  constructor(public cardData: CardData[]) {}

  toArray(): CardData[] {
    return this.cardData;
  }
}

export function mapCardData(weeklyBlogSummary: WeeklyBlogSummaryDto): BlogCardData {
  const result: BlogCardData = new BlogCardData([]);
  result.cardData.push(
    new CardData("New", weeklyBlogSummary.newNotExcluded.toString())
  );
  result.cardData.push(
    new CardData("You Read", weeklyBlogSummary.itemsRead.toString())
  );
  result.cardData.push(
    new CardData(
      "You Liked",
      weeklyBlogSummary.itemsRatedAtLeastThree.toString()
    )
  );

  return result;
}
