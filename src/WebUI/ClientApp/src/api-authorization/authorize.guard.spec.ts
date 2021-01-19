import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthorizeGuard } from './authorize.guard';

describe('AuthorizeGuard', () => {
  let mockRouter;
  beforeEach(() => {
    mockRouter = jasmine.createSpyObj(["navigate"]);
    TestBed.configureTestingModule({
      providers: [AuthorizeGuard,
      {provide: Router, useValue: mockRouter}]
    });
  });

  it('should ...', inject([AuthorizeGuard], (guard: AuthorizeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
