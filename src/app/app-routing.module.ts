import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './pages/nav/nav.component';
import { MarketRatesComponent } from './pages/market-rates/market-rates.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ProductsComponent } from './pages/products/products.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ClientsDetailsComponent } from './pages/clients/clients-details/clients-details.component';
import { AddClientComponent } from './pages/clients/add-client/add-client.component';

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
      
      {
        path: 'market-rates',
        component: MarketRatesComponent,        
      },
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
      {
        path: 'products',
        component: ProductsComponent,        
      },
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
