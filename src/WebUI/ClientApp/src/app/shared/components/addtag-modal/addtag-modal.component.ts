import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngrx/store";

import * as fromRoot from "../../../state/app.state";
import * as blogActions from "../../../blog/state/blog.actions";
import { UserTagDto } from "src/app/TechRSSReader-api";

@Component({
  selector: "app-addtag-modal",
  templateUrl: "./addtag-modal.component.html",
  styleUrls: ["./addtag-modal.component.scss"],
})
export class AddtagModalComponent implements OnInit {
  addTagForm: FormGroup;
  userTag: UserTagDto | null;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private store: Store<fromRoot.State>,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.userTag = new UserTagDto();
  }

  private createForm() {
    this.addTagForm = this.formBuilder.group({
      text: ''
    });
  }

  saveTag(): void {
      if (this.addTagForm.dirty) {
          const userTag = { ...this.userTag, ...this.addTagForm.value };
          this.store.dispatch(new blogActions.CreateUserTag(userTag));
      }
  }
}
