import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductDetailsService } from './services/product-details.service';
import { Product } from '../../core/models/product.interface';
import { CartService } from '../cart/services/cart.service';


@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  id: string | null = null;
  productDetails: Product = {} as Product;
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);


ngOnInit(): void {
  this.getProductId();
  this.getProductDetails();
}

  getProductId(): void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlParam)=>{
        this.id = urlParam.get('id');
        console.log(urlParam.get('id'));

      }
    })
  }


  getProductDetails(): void{
    this.productDetailsService.getProductsDetailsData(this.id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productDetails = res.data;
       },
      error: (err) => {
        console.log(err);

      }
    })
  }

  addItemToCart(id:string): void{
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
       this.cartService.countNumber.next(res.numOfCartItems);

        if (res.status === "success") {
          this.toastrService.success(res.message,'FreshCart')
        }

      },
      error: (err) => {
        console.log(err);

      },
    })
  }



}
