import { Component, OnInit, Input } from '@angular/core';
import { RssFeedItemDto } from 'src/app/techrssreader-api';


@Component({
  selector: 'feeditem-display',
  templateUrl: './feeditem-display.component.html',
  styleUrls: ['./feeditem-display.component.scss']
})
export class FeeditemDisplayComponent {

  @Input() feedItem: RssFeedItemDto;

}
