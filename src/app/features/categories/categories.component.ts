import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Category } from '../../core/models/category.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  private readonly categoriesService = inject(CategoriesService);
  categoriesList:Category[]=[]

  ngOnInit(): void {
      this.getAllCategories()
  }

  getAllCategories(): void{
    this.categoriesService.getAllCategories().subscribe(
      {
        next: (res) => {
          console.log(res.data);
          this.categoriesList = res.data;

        },
        error: (err) => {
          console.log(err);

        }
      }
    )
  }
}
