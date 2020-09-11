import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BlogDto } from "src/app/techrssreader-api";

@Component({
  selector: "blog-list",
  templateUrl: "./blog-list.component.html",
  styleUrls: ["./blog-list.component.scss"],
})
export class BlogListComponent {
  @Input() blogs: BlogDto[];
  @Input() selectedBlog: BlogDto;
  @Output() selected = new EventEmitter<BlogDto>();

  blogSelected(blog: BlogDto): void {
    this.selected.emit(blog);
  }
}
