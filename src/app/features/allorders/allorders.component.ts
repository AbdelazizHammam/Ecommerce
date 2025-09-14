import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../cart/services/cart.service';
import { Order } from './models/order.interface';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
  private readonly cartService = inject(CartService);
  ordersList: Order[] = [];


ngOnInit(): void {
  this.getUserOrders();
}


  getUserOrders(): void{
    this.cartService.getUseAllorders().subscribe({
      next: (res) => {
        console.log(res);
        this.ordersList = res.flatMap((order: any) => order.cartItems);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


}
