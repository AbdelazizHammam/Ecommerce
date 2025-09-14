import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../shared/components/input/input.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent  implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  id: string | null = null;
  btnType: string = 'visa';

  checkOutForm!: FormGroup;
ngOnInit(): void {
  this.initFrom();
  this.getCartId();
  }
  setBtnType(type:string): void{
    this.btnType = type;
  }

  initFrom(): void{
    this.checkOutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details:[null,[Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city:[null,[Validators.required]]

      })
    })

  }


  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParam) => {
        console.log(urlParam.get('id'));
        this.id = urlParam.get('id');
      }
    })

  }

  submitForm(): void{
    if (this.checkOutForm.valid) {
      if (this.btnType === "visa") {

        this.cartService.checkOutSession(this.id, this.checkOutForm.value).subscribe({
          next: (res) => {
            console.log(res);
            if (res.status === "success") {
                window.open(res.session.url , '_self')
            }

          },
          error: (err) => {
            console.log(err);

          }
        })
        console.log('from visa');

      } else {

        if (this.checkOutForm.valid) {
          this.cartService.cashOrder(this.id, this.checkOutForm.value).subscribe({
            next: (res) => {

              console.log(res);
              this.router.navigate(['/allorders'])
            }
          })
        }




        console.log('from cash');
      }


    }
   }
}
