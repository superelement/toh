import { TestBed, inject } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Hero } from './hero';

describe('HeroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // tut says to use HttpModule, but it errors
      providers: [
        HeroService,
        { provide: 'api/heroes', useValue: 'something/else' },
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));

  it(`returns a list of Heros on #getHeroes`, inject([HeroService, XHRBackend], (heroService, mockBackend) => {
    const response = [
      { id: 1, name: 'a', isVillain: true },
      { id: 2, name: 'b', isVillain: true }
    ];

    mockBackend.connections.subscribe(connection => {

      connection.mockRespond(
        new Response(
          new ResponseOptions({
            body: JSON.stringify(response)
          })
        )
      );
    });

    console.log('heroes')
    heroService.getHeroes().subscribe((heroes: Hero[]) => {
      console.log(heroes)
    })
    
  }));
});
