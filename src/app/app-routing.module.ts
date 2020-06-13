import { AuthGuard } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminAuthGuard } from './admin-auth-guard.service';


const routes: Routes = 
[
  {path: '', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'shopping-cart', component: ShopingCartComponent},

  
  {path: 'check-out', component: CheckOutComponent, canActivate : [AuthGuard] },
  {path: 'order-success', component: OrderSuccessComponent, canActivate : [AuthGuard] },
  {path: 'my-orders', component: MyOrdersComponent, canActivate : [AuthGuard] },
  {path: 'admin/products', component: AdminProductsComponent, canActivate : [AuthGuard, AdminAuthGuard] },
  {path: 'admin/orders', component: AdminOrdersComponent, canActivate : [AuthGuard, AdminAuthGuard] }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
