import { Injectable } from '@angular/core';
import { AutoFocusDirective } from './auto-focus.directive';

@Injectable()
export class MockElementRef {
  nativeElement: {}
}

describe('AutoFocusDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = new MockElementRef();
    const directive = new AutoFocusDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
