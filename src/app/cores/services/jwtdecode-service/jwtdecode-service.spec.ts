import { TestBed } from '@angular/core/testing';

import { JwtdecodeService } from './jwtdecode-service';

describe('JwtdecodeService', () => {
  let service: JwtdecodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtdecodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
