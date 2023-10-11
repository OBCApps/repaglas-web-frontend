import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './nav/nav.component';
import { MarketRatesComponent } from './pages/market-rates/market-rates.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ProductsComponent } from './pages/products/products.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ClientsDetailsComponent } from './pages/clients/clients-details/clients-details.component';
import { AddClientComponent } from './pages/clients/add-client/add-client.component';
import { ProductsDetailsComponent } from './pages/products/products-details/products-details.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { AllMarketRatesComponent } from './pages/market-rates/all-market-rates/all-market-rates.component';
import { RequestMarketRatesComponent } from './pages/market-rates/request-market-rates/request-market-rates.component';
import { AddMarketComponent } from './pages/market-rates/all-market-rates/add-market/add-market.component';
import { MarketDetailComponent } from './pages/market-rates/all-market-rates/market-detail/market-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: NavComponent,
    children: [
      {
        path: '',
        component: HomeComponent,        
      },
      // Listado de cotizaciones
      {
        path: 'all-market-rates',
        component: AllMarketRatesComponent,        
      },
      {
        path: 'add-market-rates',
        component: AddMarketComponent,        
      },
      {
        path: 'all-market-detail/:id',
        component: MarketDetailComponent,        
      },

      // Listado de Solicitudes
      {
        path: 'request-market-rates',
        component: RequestMarketRatesComponent,        
      },
      // Listado de Clientes
      {
        path: 'clients',
        component: ClientsComponent, 
       
      },
      {
        path: 'clients-detail/:id',
        component: ClientsDetailsComponent,            
      },
      {
        path: 'add-client',
        component: AddClientComponent,   
         
      },
      // Listado de Productos
      {
        path: 'products',
        component: ProductsComponent,        
      },
      {
        path: 'products-detail/:id',
        component: ProductsDetailsComponent,            
      },
      {
        path: 'add-product',
        component: AddProductComponent,   
         
      },
      // Adicionalmente reporters
      {
        path: 'reports',
        component: ReportsComponent,        
      },

    ]

  },

]
@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
