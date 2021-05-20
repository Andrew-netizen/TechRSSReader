import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BlogDto } from 'src/app/TechRSSReader-api';

@Component({
  selector: 'app-blog-statsbutton',
  templateUrl: './blog-statsbutton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./blog-statsbutton.component.scss']
})
export class BlogStatsbuttonComponent {
  @Input() blog: BlogDto;

  constructor(private router: Router) { }

  showStats(blog: BlogDto): void {
    this.router.navigate(['/dashboard/',blog.id]);
  }
}
