import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';

import { UserService } from '../../services/user.service';

interface Friend {
  username: string,
  age: number,
  email: string,
  _id: string
}

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  public friends: Friend[];
  public isSearch = false;
  public isAddRemoveFail = false;
  public isAddRemoveSuccess = false;
  public isAddFriend = false;
  public isMessage = false;
  public message = '';

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getFriends();
  }

  public getFriends() {
    this.userService.getFriends().pipe(
      map(data => data.users)
    ).subscribe(
      (users) => {
        this.friends = users;
      }
    );
  }

  public search(value: string) {
    if(!value) {
      this.getFriends();
      this.isSearch = false;
    }
  }

  public addFriend(friend: Friend) {
    this.userService.addFriend(friend._id).subscribe(
      (data) => {
        this.isAddRemoveFail = false;
        this.isAddRemoveSuccess = !this.isAddRemoveFail;
        this.isAddFriend = true;
      },
      (err) => {
        this.isAddRemoveFail = true;
        this.isAddRemoveSuccess = !this.isAddRemoveFail;
        this.isAddFriend = true;
        this.message = err.error.message;
      }
    );

    this.showMessage()
  }

  public removeFriend(friend: Friend) {
    this.userService.removeFriend(friend._id).subscribe(
      (data) => {
        this.friends = this.friends.filter(item => item._id !== friend._id);
        this.isAddRemoveFail = false;
        this.isAddRemoveSuccess = !this.isAddRemoveFail;
        this.isAddFriend = false;
      },
      (err) => {
        this.isAddRemoveFail = false;
        this.isAddRemoveSuccess = !this.isAddRemoveFail;
        this.isAddFriend = false;
        this.message = err.error.message;
      }
    );
    this.showMessage()
  }

  public findFriends(value: string) {
    const searchParam = value.trim();

    if (!searchParam.length) {
      this.getFriends();
      this.isSearch = false;
    } else {
      this.isSearch = true;
      this.userService
        .findFriends(searchParam)
        .pipe(map((data) => data.findUsers))
        .subscribe(
          (findUsers) => {
            this.friends = findUsers;
          }
        );
    }
  }

  public showMessage() {
    this.isMessage = !this.isMessage;

    setTimeout(() => {
      this.isMessage = !this.isMessage;
    }, 1500);
  }
}
