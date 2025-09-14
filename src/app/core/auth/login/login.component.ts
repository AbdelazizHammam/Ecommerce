import { CookieService } from 'ngx-cookie-service';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription, SubscriptionLike } from 'rxjs';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
isLoading: boolean = false;
  msgError: string = '';
  subscription: SubscriptionLike = new Subscription();
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);


  loginForm!: FormGroup

  initForm(): void {
    this.loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    )]),
  } );
  }
  ngOnInit(): void {
    this.initForm();
  }

  formSubmit(): void{
    if (this.loginForm.valid) {
      this.subscription.unsubscribe();

      console.log(this.loginForm.value);
       this.subscription=  this.authService.loginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === "success") {
            this.msgError = '';
            this.cookieService.set('token', res.token);
            console.log(this.authService.decodeToken());

            this.router.navigate(['/home']);
                                             }

          this.isLoading = false;
        },
        error: (err) => {
          console.log(err.error.message);

          this.msgError = err.error.message;
          this.isLoading = false;

        }
      })
    }



  }

}
