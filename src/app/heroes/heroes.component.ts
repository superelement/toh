import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Router, NavigationEnd, ActivatedRoute, UrlSegment } from '@angular/router';

import { Subscription, of, from } from 'rxjs';
import { first, filter, map } from 'rxjs/operators';
import { VILLAINS_ROUTE } from '../constants';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  isVillain = false;

  constructor(
    private heroService: HeroService,
    private activatedRoute : ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    
    // this will auto-unsubscribe
    this.activatedRoute.url.subscribe((val: UrlSegment[]) => {
      this.isVillain = val[0].path === VILLAINS_ROUTE;
      this.cdr.markForCheck();
      
      this.getHeroes();
    });
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes.filter(o => o.isVillain === this.isVillain);
        this.cdr.markForCheck();
      });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name, isVillain: this.isVillain } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.cdr.markForCheck();
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.cdr.markForCheck();
    this.heroService.deleteHero(hero)
      .subscribe();
  }


  get heading(): string {
    return this.isVillain ? 'Villains' : 'Heroes';
  }

  get nameText(): string {
    return this.isVillain ? 'Villain' : 'Hero';
  }
}
