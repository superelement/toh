import { TestBed, inject } from '@angular/core/testing';

import { HeroService, HEROES_URL } from './hero.service';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Hero } from './hero';
import { HttpClient } from '@angular/common/http';

describe('HeroService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // tut says to use HttpModule, but it errors
      providers: [
        HeroService
      ]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));

  describe('getHeroes', () => {

    function getHeroes(service, dataOrError: Hero[] | string): Hero[] {
      let loadedData;
      service.getHeroes().subscribe(data => loadedData = data);
  
      // now create the request
      const req = httpTestingController.expectOne(HEROES_URL);
  
      // Assert that the request is a GET.
      expect(req.request.method).toEqual('GET');
      
      // Respond with mock data, causing Observable to resolve.
      // Subscribe callback asserts that correct data was returned.
      if (typeof dataOrError === 'string') {
        req.error(new ErrorEvent(dataOrError));
      } else {
        req.flush(dataOrError);
      }
  
      // Finally, assert that there are no outstanding requests.
      httpTestingController.verify();

      return loadedData;
    }
    
    
    it(`returns a list of Heros on #getHeroes`, inject([HeroService], (service: HeroService) => {
      const testData: Hero[] = [
        { id: 1, name: 'a', isVillain: true },
        { id: 2, name: 'b', isVillain: true }
      ];

      const loadedData = getHeroes(service, testData)
      expect(loadedData).toEqual(testData);
    }));

    it(`resolves to an empty array and handles the error`, inject([HeroService], (service: HeroService) => {
      const handleErrorSpy = spyOn(service, 'handleError').and.callThrough();
      const loadedData = getHeroes(service, 'some issue')

      expect(loadedData).toEqual([]);
      expect(handleErrorSpy).toHaveBeenCalled();
    }));
  });


});
