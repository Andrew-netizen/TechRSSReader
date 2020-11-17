import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import {
  RssFeedItemDto,
  UpdateFeedItemCommand,
} from "src/app/TechRSSReader-api";

@Component({
  selector: "app-rate-feeditem",
  templateUrl: "./rate-feeditem.component.html",
  styleUrls: ["./rate-feeditem.component.scss"],
})
export class RateFeeditemComponent implements OnInit {
  @Input() currentFeedItem: RssFeedItemDto;
  @Output() userRegisteredInterest = new EventEmitter<UpdateFeedItemCommand>();

  trainingForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.trainingForm = this.formBuilder.group({
      userRating: 0,
      readAlready: false,
    });
    if (this.currentFeedItem.userRating)
      this.trainingForm.controls["userRating"].setValue(this.currentFeedItem.userRating);
  }

  handleRatingClicked(rating: number) {
    this.trainingForm.controls["userRating"].setValue(rating);
    this.trainingForm.markAsDirty();
  }

  saveUserInterest(): void {
    const userRating: number = this.trainingForm.get("userRating").value;
    const command: UpdateFeedItemCommand = UpdateFeedItemCommand.fromJS({
      id: this.currentFeedItem.id,
      bookmarked: this.currentFeedItem.bookmarked,
      readAlready: this.currentFeedItem.readAlready,
      userRating: userRating,
    });

    this.userRegisteredInterest.emit(command);
  }
}
