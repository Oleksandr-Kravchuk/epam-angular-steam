import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public isProfileFormFail = false;
  public isProfileFormSuccess = false;
  public isMessage = false;
  public errorMessage = '';

  public constructor(
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.userService
      .getProfile()
      .pipe(map((data) => data.user))
      .subscribe(
        (user) => {
          this.profileForm = new FormGroup({
            email: new FormControl(user.email),
            age: new FormControl(user.age),
            username: new FormControl(user.username),
          });

          this.isProfileFormFail = false;
          this.isProfileFormSuccess = !this.isProfileFormFail;
        },
        (err) => {
          this.isProfileFormFail = true;
          this.isProfileFormSuccess = !this.isProfileFormFail;
          this.errorMessage = err.error.message;
        }
      );
  }

  public onSave(): void {
    const { username, email, age } = this.profileForm.value;

    this.userService.updateProfile(username, email, age).subscribe(
      (data) => {
        this.isProfileFormFail = false;
        this.isProfileFormSuccess = true;
      },
      (err) => {
        this.isProfileFormFail = true;
        this.isProfileFormSuccess = false;
        this.errorMessage = err.error.message;
      }
    );
    this.showMessage();
  }

  public showMessage() {
    this.isMessage = !this.isMessage;

    setTimeout(() => {
      this.isMessage = !this.isMessage;
    }, 3000);
  }
}
