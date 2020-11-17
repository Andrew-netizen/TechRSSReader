import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogDto } from 'src/app/TechRSSReader-api';

@Component({
  selector: 'app-blog-editbutton',
  templateUrl: './blog-editbutton.component.html',
  styleUrls: ['./blog-editbutton.component.scss']
})
export class BlogEditbuttonComponent implements OnInit {
  @Input() blog: BlogDto;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  editBlog(blog: BlogDto): void {
    this.router.navigate(['/blogs/',blog.id]);
  }

}
