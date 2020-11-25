import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-blog',
  templateUrl: './dashboard-blog.component.html',
  styleUrls: ['./dashboard-blog.component.scss']
})
export class DashboardBlogComponent implements OnInit {

  thisWeekData = [
    {name: "New", value: 10},
    {name: "You Read", value: 15},
    {name: "Excluded", value: 12}
  ];

  multiWeekData = [
    {
      "name": "New",
      "series": [
        {
          "name": "2020-10-26",
          "value": "11"
        },
        {
          "name": "2020-11-02",
          "value": "15"
        },
        {
          "name": "2020-11-09",
          "value": "13"
        },
        {
          "name": "2020-11-16",
          "value": "20"
        }
      ]
    },
    {
      "name": "Read",
      "series": [
        {
          "name": "2020-10-26",
          "value": "5"
        },
        {
          "name": "2020-11-02",
          "value": "4"
        },
        {
          "name": "2020-11-09",
          "value": "7"
        },
        {
          "name": "2020-11-16",
          "value": "10"
        }
      ]
    }
  ];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Articles';
  timeline: boolean = false;
  cardColor: string = '#17252A';

  colorScheme = {
    domain: ['#3AAFA9', '#DEF2F1', '#2B7A78', '#2B7A78', '#3AAFA9', '#DEF2F1' ]
  };

  colorSchemeFirstRow = {
    domain: ['#3AAFA9', '#DEF2F1', '#2B7A78' ]
  };

  colorSchemeSecondRow = {
    domain: [ '#2B7A78', '#3AAFA9', '#DEF2F1' ]
  };

  view: any[] = [470, 300];

  cardView: any[] = [470, 150];

  lineChartView: any[] = [470, 300];

  blogTitle: string = "Scott Hanselman";

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(event) {
    console.log(event);
  }

}
