import { ToastrService } from 'ngx-toastr';
import { Cart } from './models/cart.interface';
import { CartService } from './services/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);


  cartDetails:Cart={} as Cart
ngOnInit(): void {
  this.getLoggedUserCart();
}

  getLoggedUserCart(): void{

    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {

        console.log(res.data);
        this.cartDetails = res.data;

      },error: (err) => {
        console.log(err);

      }
    })
  }



  removeItem(id:string): void{
    this.cartService.removeSpecificProductFromCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === "success") {
          this.toastrService.error("✅ The product has been removed from your cart successfully." ,'FreshCart')
        }
        this.cartService.countNumber.next(res.numOfCartItems);
         this.cartDetails = res.data;

      },
      error: (err) => {
        console.log(err);
      }
    })
  };

  updateCount(id:string,count:number): void{
    this.cartService.updateCartCount(id, count).subscribe({
      next: (res) => {
        console.log(res);

         this.cartDetails = res.data;

      },
      error: (err) => {
        console.log(err);

      },
    })
  }


  clearCart(): void{
    this.cartService.clearUserCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === "success") {
          this.toastrService.error("✅ The Cart has been Cleared successfully." ,'FreshCart')
        }
        this.router.navigate(['/home']);


      },
      error: (err) => {
        console.log(err);

      }
    })
  }



}
