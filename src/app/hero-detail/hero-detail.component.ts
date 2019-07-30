import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  nemesis: Hero;
  nemesisList: Hero[];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .pipe(
        mergeMap(
          hero => hero.nemesisId || hero.nemesisId === 0 ? this.heroService.getHero(hero.nemesisId) : of(null),
          (hero, nemesis) => {
            this.hero = hero;
            this.nemesis = nemesis || {id: -1, name: '(not set)', isVillain: true};
          }
        )
      )
      .subscribe(() => {
        this.cdr.markForCheck();

        if (this.hero.nemesisId || this.hero.nemesisId === 0) {
          this.setNemesisList();
        }
      });
  }



  setNemesisList(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.nemesisList = heroes.filter(o => o.isVillain);
        this.cdr.markForCheck();
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.hero.nemesisId = this.nemesis.id;
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  onNemesisChange(id: string): void {
    this.nemesis = this.nemesisList.find(o => o.id.toString() === id);
  }

  get status(): string {
    return this.hero.isVillain ? 'Villain' : 'Hero';
  }
}
