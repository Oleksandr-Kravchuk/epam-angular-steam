import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    username: new FormControl(''),
    age: new FormControl(''),
  });
  public isRegisterFailed = false;
  public errorMessage = '';

  public constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  public ngOnInit(): void {
  }

  public onSubmit(): void {
    this.authService.register(this.registerForm.value).subscribe(
      (data) => {
        this.router.navigate(['/login']);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isRegisterFailed = true;
      }
    );
  }
}
