import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogDto } from 'src/app/TechRSSReader-api';

@Component({
  selector: 'app-blog-statsbutton',
  templateUrl: './blog-statsbutton.component.html',
  styleUrls: ['./blog-statsbutton.component.scss']
})
export class BlogStatsbuttonComponent implements OnInit {
  @Input() blog: BlogDto;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showStats(blog: BlogDto): void {
    this.router.navigate(['/dashboard/',blog.id]);
  }
}
