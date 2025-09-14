import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Category } from '../../../../core/models/category.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss'
})
export class PopularCategoriesComponent implements OnInit {
  popularCategoriesList: Category[] = []

 categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
   dots: true,
   margin: 10,
   autoplay: true,
   autoplayHoverPause: true,
    autoplayTimeout:3500,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }











  ngOnInit(): void {
    this.getAllCategoriesData();
  }

  private readonly categoriesService = inject(CategoriesService);

  getAllCategoriesData(): void{
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.popularCategoriesList = res.data;
        console.log(res.data);

      },
      error: (err) => {
        console.log(err);

      },
    })
  }

}
