import { Component, inject } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { Product } from '../../../../core/models/product.interface';
import { ProductsService } from '../../../../core/services/products/products.service';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.scss'
})
export class PopularProductsComponent {

  productList: Product[] = [];
  private readonly productsService = inject(ProductsService)


ngOnInit(): void {
  this.getAllData()
  };


  getAllData(): void{
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList = res.data;

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

}
