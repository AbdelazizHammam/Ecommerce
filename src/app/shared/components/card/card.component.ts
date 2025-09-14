import { CookieService } from 'ngx-cookie-service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { httpResource } from '@angular/common/http';



@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {

  @Input({ required: true }) product: Product = {} as Product;
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly cookieService = inject(CookieService);
  flag: boolean = true;
  whislistItems: Product[] = [];
  ngOnInit(): void {
    this.getLoggedUserWishlist();
  }

  addItemToCart(id: string): void{
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.countNumber.next(res.numOfCartItems);


        if (res.status === "success") {

          this.toastrService.success(res.message,'FreshCart');
        }

      },
      error: (err) => {
        console.log(err);

      }
  })
  }

  toggleWishList(id: string): void{
    if (this.flag) {
        this.cartService.addProductToWishlist(id).subscribe({
      next: (res) => {
        console.log(res.data);
        if (res.status === "success") {
          this.flag = false;
          this.toastrService.success(res.message,'Fresh Cart');

        }

      }
    })
    }
    else {
         this.cartService.removeFromWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
             this.flag = true;
             this.toastrService.error(res.message, 'Fresh Cart');

      }
    })
    }
  }


   addToWishlist(id:string): void{

  }
  getLoggedUserWishlist(): void{
    this.cartService.getLoggedUserWishlist().subscribe({
      next: (res) => {

        this.whislistItems=res.data;
         const found = res.data.some((item: any) => item._id === this.product._id);
        this.flag = !found;

      }

    })
  }

  removeItem(id:string): void{

  }
}
