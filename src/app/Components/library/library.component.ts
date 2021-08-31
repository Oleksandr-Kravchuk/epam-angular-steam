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
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  public games: Game[];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getLibrary();
  }

  public getLibrary() {
    this.userService.getLibrary().pipe(
      map(data => data.games)
    ).subscribe(
      (games) => {
        this.games = games;
      }
    );
  }

  public downloadGame(game: Game) {
    alert(`The game ${game.title} is loaded`)
  }

  public shareGame(game: Game) {
    alert(`The game ${game.title} is shared`)
  }
}
