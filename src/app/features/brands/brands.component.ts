import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from './services/brands.service';
import { Brand } from './models/brand.interface';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);

  brandsList: Brand[] = [];
  brandDetail: Brand = {} as Brand;
  isModalOpen = false;

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsList = res.data;
      },
      error: (err) => console.error(err),
    });
  }

  getBrand(id: string): void {
    this.brandsService.getSpecificBrand(id).subscribe({
      next: (res) => {
        this.brandDetail = res.data;
        this.isModalOpen = true;
      },
      error: (err) => console.error(err),
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
