/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MapObjectService } from './map-object.service';

describe('MapObjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapObjectService]
    });
  });

  it('should ...', inject([MapObjectService], (service: MapObjectService) => {
    expect(service).toBeTruthy();
  }));
});
