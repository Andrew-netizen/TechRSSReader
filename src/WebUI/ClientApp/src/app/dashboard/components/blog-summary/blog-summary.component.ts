import { Component, Input } from '@angular/core';
import { BlogDto, WeeklyBlogSummaryDto } from 'src/app/TechRSSReader-api';
import { BlogCardData, CardData } from '../../card-data';

@Component({
  selector: 'app-blog-summary',
  templateUrl: './blog-summary.component.html',
  styleUrls: ['./blog-summary.component.scss']
})
export class BlogSummaryComponent {

  @Input() cardDataArray: CardData[];
  @Input() selectedBlog: BlogDto;
  @Input() weeklyBlogSummaries: WeeklyBlogSummaryDto[];
  @Input() lastMonthChartData: Object[];


}
