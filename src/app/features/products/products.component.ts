import { Component, inject } from '@angular/core';
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { CardComponent } from "../../shared/components/card/card.component";
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  imports: [CardComponent,NgxPaginationModule ,SearchPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  pageSize!: number;
  p!: number;
  total!: number;
  productList: Product[] = [];
  private readonly productsService = inject(ProductsService);


  text: string = '';


ngOnInit(): void {
  this.getAllData()
  };


  getAllData(pageNumber: number = 1): void{

    this.productsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;


      },
      error: (err) => {
        console.log(err);


      }
    })
  }
}
