import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FeedItemUserTagDto, RssFeedItemDto, UserTagDto } from "src/app/TechRSSReader-api";

@Component({
  selector: "app-add-itemtag-modal",
  templateUrl: "./add-itemtag-modal.component.html",
  styleUrls: ["./add-itemtag-modal.component.scss"],
})
export class AddItemtagModalComponent implements OnInit {
  @Input() userTags: UserTagDto[];
  @Input() feedItem: RssFeedItemDto;

  addItemTagForm: FormGroup;
  feedItemUserTag: FeedItemUserTagDto | null;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.feedItemUserTag = new FeedItemUserTagDto();
  }

  private createForm() {
    this.addItemTagForm = this.formBuilder.group({
      userTagId: 0,
    });
  }

  saveItemTag(): void {
    this.feedItemUserTag.rssFeedItemId = this.feedItem.id;
    const itemTag = { ...this.feedItemUserTag, ...this.addItemTagForm.value };
    this.activeModal.close(itemTag);
  }
}
