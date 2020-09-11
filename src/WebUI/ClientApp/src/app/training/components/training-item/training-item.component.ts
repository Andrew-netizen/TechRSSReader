import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

import {
  RssFeedItemDto,
  BlogDto,
  UpdateUserInterestedCommand,
} from "src/app/techrssreader-api";

@Component({
  selector: "training-item",
  templateUrl: "./training-item.component.html",
  styleUrls: ["./training-item.component.scss"],
})
export class TrainingItemComponent {
  @Input() currentFeedItem: RssFeedItemDto;
  @Input() selectedBlog: BlogDto;
  @Output() loadItemRequest = new EventEmitter<BlogDto>();
  @Output() userRegisteredInterest = new EventEmitter<
    UpdateUserInterestedCommand
  >();

  trainingForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.trainingForm = this.formBuilder.group({
      userInterested: false,
    });
  }

  loadFeedItemClicked(): void {
    this.loadItemRequest.emit(this.selectedBlog);
  }

  saveUserInterest(): void {
    const userInterested: boolean = this.trainingForm.get("userInterested")
      .value;
    const command: UpdateUserInterestedCommand = UpdateUserInterestedCommand.fromJS(
      {
        id: this.currentFeedItem.id,
        userInterested: userInterested,
      }
    );

    this.userRegisteredInterest.emit(command);
    this.trainingForm.reset();
  }
}
