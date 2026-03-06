import { TestBed } from '@angular/core/testing';

import { ManaToastService } from './mana-toast.service';

describe('ManaToastService', () => {
  let service: ManaToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManaToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
