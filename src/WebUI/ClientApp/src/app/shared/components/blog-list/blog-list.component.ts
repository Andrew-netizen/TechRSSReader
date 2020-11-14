import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { BlogDto } from "src/app/TechRSSReader-api";

@Component({
  selector: "blog-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./blog-list.component.html",
  styleUrls: ["./blog-list.component.scss"],
})
export class BlogListComponent {
  @Input() blogs: BlogDto[];
  @Input() selectedBlog: BlogDto;
  @Output() selected = new EventEmitter<BlogDto>();

  public isCollapsed = false;

  blogSelected(blog: BlogDto): void {
    this.selected.emit(blog);
  }
}
