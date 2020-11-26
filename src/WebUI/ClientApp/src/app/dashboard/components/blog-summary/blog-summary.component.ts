import { Component, Input } from '@angular/core';
import { BlogDto, WeeklyBlogSummaryDto } from 'src/app/TechRSSReader-api';
import { CardData } from '../../card-data';

@Component({
  selector: 'app-blog-summary',
  templateUrl: './blog-summary.component.html',
  styleUrls: ['./blog-summary.component.scss']
})
export class BlogSummaryComponent {

  @Input() latestCardData: CardData[];
  @Input() selectedBlog: BlogDto;
  @Input() weeklyBlogSummaries: WeeklyBlogSummaryDto[];


}
