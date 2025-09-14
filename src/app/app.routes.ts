import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth-guard';
import { isLoggedGuard } from './core/guards/is-logged-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // 🔹 Auth Layout
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isLoggedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/login/login.component').then(c => c.LoginComponent),
        title: 'Login Page',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/register/register.component').then(c => c.RegisterComponent),
        title: 'Register Page',
      },
      {
        path: 'forgot',
        loadComponent: () =>
          import('./core/auth/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent),
        title: 'ForgotPassword Page',
      },
    ],
  },

  // 🔹 Main Layout
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then(c => c.HomeComponent),
        title: 'Home Page',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component').then(c => c.CartComponent),
        title: 'Cart Page',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./features/wishlist/wishlist.component').then(c => c.WishlistComponent),
        title: 'Cart Page',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then(c => c.ProductsComponent),
        title: 'Products Page',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands.component').then(c => c.BrandsComponent),
        title: 'Brands Page',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories.component').then(c => c.CategoriesComponent),
        title: 'Categories Page',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/allorders/allorders.component').then(c => c.AllordersComponent),
        title: 'Allorders Page',
      },
      {
        path: 'details/:slug/:id',
        loadComponent: () =>
          import('./features/details/details.component').then(c => c.DetailsComponent),
        title: 'Details Page',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/details/details.component').then(c => c.DetailsComponent),
        title: 'Details Page',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./features/checkout/checkout.component').then(c => c.CheckoutComponent),
        title: 'Checkout Page',
      },
    ],
  },

  // 🔹 Not Found
  {
    path: '**',
    loadComponent: () =>
      import('./features/notfound/notfound.component').then(c => c.NotfoundComponent),
    title: 'NotFound Page',
  },
];
