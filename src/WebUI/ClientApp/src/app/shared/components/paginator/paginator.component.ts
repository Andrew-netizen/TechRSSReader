import { EventEmitter } from '@angular/core';
import { Component, Input, Output} from '@angular/core';
import { Console } from 'console';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() currentPage: number;
  @Input() pageCount: number;
  @Output() currentPageUpdated = new EventEmitter<number>();

  currentPageChanged(value: number): void {
    this.currentPageUpdated.emit(value);
  }
}
