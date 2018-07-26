/** Program Name : Angular Fridge
 ** Author : Peter Cross
 ** Date : July 26, 2018
 */

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { DataService } from './data.service';
import { HttpdataService } from './httpdata.service';

describe('HttpdataService', () => 
{
  beforeEach(() => {
    TestBed.configureTestingModule(
    {
        providers: [DataService]
        //providers: [ {provide: DataService, useClass: HttpdataService} ]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});