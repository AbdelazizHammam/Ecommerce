import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../cart/services/cart.service';
import { WishItems } from './models/wish-items.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  whislistItems: WishItems = {} as WishItems;

  flag: boolean = true;
  ngOnInit(): void {
    this.getLoggedUserWishlist();
  }
   getLoggedUserWishlist(): void{
    this.cartService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.whislistItems=res;


      }

    })
  }

  removeItem(id:string): void{
    this.cartService.removeFromWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        if(res.status==="success"){
          this.toastrService.error(res.message,'Fresh Cart')
        }
        this.whislistItems.data = this.whislistItems.data.filter(item => item._id !== id);

      }
    })
  }

  addToCart(id:string): void{
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
       if (res.status==="success") {
         this.cartService.countNumber.next(res.numOfCartItems);
         this.toastrService.success(res.message, 'Fresh Cart');
       }


    }
  })
}
}
