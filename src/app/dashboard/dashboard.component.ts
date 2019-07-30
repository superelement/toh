import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { from, of } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();

    of<Hero[]>([
      { id: 1, name: 'Jim', isVillain: false, nemesisId: 101 },
      { id: 2, name: 'Melinda', isVillain: false, nemesisId: 102 },
      { id: 3, name: 'Tibi', isVillain: true },
      { id: 4, name: 'Bartor', isVillain: true }
    ]).pipe(
      map(heroes => heroes.filter(o => o.isVillain === true)),
      tap(heroes => console.log(heroes)),
    ).subscribe(() => {});
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
