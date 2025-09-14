import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  flag: boolean = true;
  isLoading: boolean = false;
  msgError: string = '';
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  registerForm!: FormGroup
  initForm():void {
    this.registerForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    )]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])

  }, { validators: this.confirmPassword });

  }
    ngOnInit(): void {
      this.initForm()
    }

  formSubmit(): void{
    if (this.registerForm.valid) {
      this.isLoading = true;

      console.log(this.registerForm.value);
      this.authService.registerForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === "success") {
            this.msgError = '';
                    setTimeout(() => {
            this.router.navigate(['/login']);

                    }, 1000);                          }

          this.isLoading = false;
        },
        error: (err) => {
          console.log(err.error.message);

          this.msgError = err.error.message;
          this.isLoading = false;

        }
      })
    } else {
      this.registerForm.get('rePassword')?.patchValue('');
      this.registerForm.markAllAsTouched();
    }


  }
    confirmPassword(group: AbstractControl) {
      if (group.get('password')?.value === group.get('rePassword')?.value) {
        return null;
      }
      else {
        group.get('rePassword')?.setErrors({mismatch:true})

        return { mismatch: true };
      }
  }


}
