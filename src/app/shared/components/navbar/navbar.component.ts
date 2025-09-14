import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(private flowbiteService: FlowbiteService) {}
  @Input({ required: true }) isLogin!: boolean;
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly id = inject(PLATFORM_ID);


  count!: number;

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.getCartNumber();
    if (isPlatformBrowser(this.id)) {

      this.getAllDataCart(); 
    }
  }

  getCartNumber(): void{
    this.cartService.countNumber.subscribe({
      next: (value) => {
        this.count=value
      }
    })
  }

  getAllDataCart(): void{
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.countNumber.next(res.numOfCartItems)
      }
    })
  }


  signOut(): void{
    this.authService.logOut();

  }
}
