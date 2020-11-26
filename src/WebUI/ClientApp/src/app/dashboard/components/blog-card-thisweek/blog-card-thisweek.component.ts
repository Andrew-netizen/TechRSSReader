import { Component, Input, OnInit } from '@angular/core';
import { CardData } from '../../card-data';

@Component({
  selector: 'app-blog-card-thisweek',
  templateUrl: './blog-card-thisweek.component.html',
  styleUrls: ['./blog-card-thisweek.component.scss']
})
export class BlogCardThisweekComponent implements OnInit {
  @Input() latestCardData: CardData[];

  cardColor: string = '#17252A';
  cardView: any[] = [470, 150];
  colorScheme = {
    domain: [ '#2B7A78', '#3AAFA9', '#DEF2F1' ]
  };

  constructor() { }

  ngOnInit(): void {

  }

}
