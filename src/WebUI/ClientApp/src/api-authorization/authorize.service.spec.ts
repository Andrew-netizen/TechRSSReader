import { TestBed, inject } from '@angular/core/testing';
import { AuthorizeService } from './authorize.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing"

describe('AuthorizeService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorizeService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', inject([AuthorizeService], (service: AuthorizeService) => {
    expect(service).toBeTruthy();
  }));
});
