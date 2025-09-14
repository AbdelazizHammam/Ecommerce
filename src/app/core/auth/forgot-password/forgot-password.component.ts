import { CookieService } from 'ngx-cookie-service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input.component";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  verifyEmail!: FormGroup;
  verifyCode!: FormGroup;
  resetPassword!: FormGroup;
  step: number = 1;
  userEmail: string = '';
ngOnInit(): void {
  this.initForm();
}
  initForm(): void{
    this.verifyEmail = this.fb.group({
      email:[null,[Validators.required , Validators.email]]
    })
    this.verifyCode = this.fb.group({
      resetCode:[null,[Validators.required ]]
    })
    this.resetPassword = this.fb.group({
      email: [{value:null ,disabled:true}, [Validators.required, Validators.email]],
      newPassword:[null, [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    ) ]]
    })





  };


  formStep1(): void{
    if (this.verifyEmail.valid) {
      this.authService.submitVerifyEmail(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
          this.userEmail = this.verifyEmail.value.email;
        this.step=2
      }
    })
   }
  }
 formStep2(): void{
    if (this.verifyCode.valid) {
      this.authService.submitVerifyCode(this.verifyCode.value).subscribe({
      next: (res) => {
          console.log(res);
          this.resetPassword.patchValue({ email: this.userEmail });

        this.step=3
      }
    })
   }
  }
   formStep3(): void{
     if (this.resetPassword.valid) {
      const data = {
      email: this.userEmail,
      newPassword: this.resetPassword.get('newPassword')?.value
    };
      this.authService.submitResetPassword(data).subscribe({
      next: (res) => {
        console.log(res);
          this.cookieService.set('token', res.token);
          this.router.navigate(['/home']);
      }
    })
   }
  }

}
