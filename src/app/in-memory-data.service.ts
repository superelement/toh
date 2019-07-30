import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice', isVillain: false, nemesisId: 101 },
      { id: 12, name: 'Narco', isVillain: false, nemesisId: 102 },
      { id: 13, name: 'Bombasto', isVillain: false, nemesisId: 103 },
      { id: 14, name: 'Celeritas', isVillain: false, nemesisId: 104 },
      { id: 15, name: 'Magneta', isVillain: false, nemesisId: 105 },
      { id: 16, name: 'RubberMan', isVillain: false, nemesisId: 106 },
      { id: 17, name: 'Dynama', isVillain: false, nemesisId: 107 },
      { id: 18, name: 'Dr IQ', isVillain: false, nemesisId: 108 },
      { id: 19, name: 'Magma', isVillain: false, nemesisId: 109 },
      { id: 20, name: 'Tornado', isVillain: false, nemesisId: 110 },

      { id: 101, name: 'Misguided Max', isVillain: true },
      { id: 102, name: 'Drop Bear Dave', isVillain: true },
      { id: 103, name: 'Wormhole Warren', isVillain: true },
      { id: 104, name: 'Angry Angela', isVillain: true },
      { id: 105, name: 'Disgruntled Daisy', isVillain: true },
      { id: 106, name: 'Zombie Zac', isVillain: true },
      { id: 107, name: 'Bastard Bret', isVillain: true },
      { id: 108, name: 'Nigel the Narcissist', isVillain: true },
      { id: 109, name: 'Sociopath Steve', isVillain: true },
      { id: 110, name: 'Jealous Jim', isVillain: true }
    ];

    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
