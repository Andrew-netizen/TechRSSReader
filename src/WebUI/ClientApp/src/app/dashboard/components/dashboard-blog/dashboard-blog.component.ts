import { Component, Input } from '@angular/core';
import { WeeklyBlogSummaryDto } from 'src/app/TechRSSReader-api';
import { CardData } from '../../card-data';

@Component({
  selector: 'app-dashboard-blog',
  templateUrl: './dashboard-blog.component.html',
  styleUrls: ['./dashboard-blog.component.scss']
})
export class DashboardBlogComponent {
  @Input() allBlogsCardData: CardData[][];
  @Input() weeklyBlogSummaries: WeeklyBlogSummaryDto[];


}
