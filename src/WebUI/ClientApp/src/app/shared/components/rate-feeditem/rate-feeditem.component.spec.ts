import { Component, Input } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RssFeedItemDto } from "src/app/TechRSSReader-api";

import { RateFeeditemComponent } from "./rate-feeditem.component";

describe("RateFeeditemComponent", () => {
  let component: RateFeeditemComponent;
  let fixture: ComponentFixture<RateFeeditemComponent>;
  const formBuilder: FormBuilder = new FormBuilder();


  @Component({
    selector: 'pm-star',
    template: '<div></div>',
  })
  class MockStarComponent {
    @Input() rating = 0;
    starWidth = 0;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RateFeeditemComponent, MockStarComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: FormBuilder, useValue: formBuilder }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateFeeditemComponent);
    component = fixture.componentInstance;
    component.currentFeedItem = new RssFeedItemDto({userRating: null});
    component.trainingForm = formBuilder.group({
      userRating: 0,
      readAlready: false,
    });

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
