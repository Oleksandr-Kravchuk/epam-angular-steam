import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { map } from 'rxjs/operators';

interface Game {
  title: string,
  price: number,
  description: string,
  _id: string
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})

export class GamesComponent implements OnInit {
  public games: Game[];
  public isSearch = false;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getGames();
  }

  public search(value: string) {
    if(!value) {
      this.getGames();
      this.isSearch = false;
    }
  }

  public getGames() {
    this.userService.getGames().pipe(
      map(data => data.games)
    ).subscribe(
      (games) => {
        this.games = games;
      }
    );
  }

  public addGame(game: Game) {
    this.userService.addGame(game._id).subscribe();
  }

  public findGames(value: string) {
    const searchParam = value.trim();

    if (!searchParam.length) {
      this.getGames();
      this.isSearch = false;
    } else {
      this.userService
        .findGames(searchParam)
        .pipe(map((data) => data.findGames))
        .subscribe(
          (findGames) => {
            this.isSearch = true;
            this.games = findGames;
          }
        );
    }
  }
}
