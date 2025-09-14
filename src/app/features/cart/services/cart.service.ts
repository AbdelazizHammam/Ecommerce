import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Decode } from '../models/decode.interface';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  userId!: string;
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  countNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addProductToCart(id:string): Observable<any>{
    return this.httpClient.post(environment.baseUrl + 'cart',

      {
        productId: id
      },


    );
  }
  getLoggedUserCart(): Observable<any>{
    return this.httpClient.get(environment.baseUrl + 'cart',

    )
  }
  removeSpecificProductFromCart(id:string): Observable<any>{
    return this.httpClient.delete(environment.baseUrl + `cart/${id}`  )
  };

  updateCartCount(id:string,count:number): Observable<any>{
    return this.httpClient.put(environment.baseUrl + `cart/${id}`,
    {
    count: count
      },

  )
}


  clearUserCart(): Observable<any>{
    return this.httpClient.delete(environment.baseUrl + 'cart')
  }

  checkOutSession(id:string | null ,data:object): Observable<any>{
    return this.httpClient.post(environment.baseUrl + `orders/checkout-session/${id}?url=http://localhost:4200`, data);
  };
  cashOrder(id:string | null ,data:object): Observable<any>{
    return this.httpClient.post(environment.baseUrl + `orders/${id}`, data);
  };






   decodeToken() {
    let token;
    try {
      token = jwtDecode<Decode>(this.cookieService.get('token'));
      this.userId = token.id;
    return token;


    } catch (error) {
      console.log(error);
      return null;
    }

  }

  getUseAllorders(): Observable<any>{
    if (!this.userId) {
    this.decodeToken();
  }
    return this.httpClient.get(environment.baseUrl + `orders/user/${this.userId}`);
  };

  getLoggedUserWishlist(): Observable<any>{
    return this.httpClient.get(  environment.baseUrl + 'wishlist')
  }

  addProductToWishlist(id:string): Observable<any>{
    return this.httpClient.post(environment.baseUrl + 'wishlist',
      {
        productId: id
      });
  }
  removeFromWishlist(id:string): Observable<any>{
    return this.httpClient.delete(environment.baseUrl + `wishlist/${id}`)
  }

}
