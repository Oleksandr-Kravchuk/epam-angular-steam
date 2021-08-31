import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  public isLoginFailed = false;
  public errorMessage = '';

  public constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
  ) {}

  public ngOnInit(): void {
  }

  public onSubmit(): void {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.isLoginFailed = false;
        this.router.navigate(['/games']);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
