import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { LoadingsComponent } from './models/functions/loading/loadings/loadings.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';

import { MarketRatesComponent } from './pages/market-rates/market-rates.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ProductsComponent } from './pages/products/products.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ClientsDetailsComponent } from './pages/clients/clients-details/clients-details.component';
import { AddClientComponent } from './pages/clients/add-client/add-client.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { ProductsDetailsComponent } from './pages/products/products-details/products-details.component';
import { NgChartsModule } from 'ng2-charts';
import { NavComponent } from './nav/nav.component';
import { RequestMarketRatesComponent } from './pages/market-rates/request-market-rates/request-market-rates.component';
import { AllMarketRatesComponent } from './pages/market-rates/all-market-rates/all-market-rates.component';
import { AddMarketComponent } from './pages/market-rates/all-market-rates/add-market/add-market.component';
import { MarketDetailComponent } from './pages/market-rates/all-market-rates/market-detail/market-detail.component';

import { SuppliersComponenet } from './pages/suppliers/suppliers.component';
import { SuppliersDetailsComponent } from './pages/suppliers/suppliers-details/suppliers-details.component';
import { AddSupplierComponent } from './pages/suppliers/add-suppliers/add-suppliers.component';


@NgModule({ 
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingsComponent,
    HomeComponent,
    NavComponent,
    MarketRatesComponent,
    ClientsComponent,
    ProductsComponent,
    ReportsComponent,
    ClientsDetailsComponent,
    AddClientComponent,
    AddProductComponent,
    ProductsDetailsComponent,
    RequestMarketRatesComponent,
    AllMarketRatesComponent,
    AddMarketComponent,
    MarketDetailComponent,
    
    SuppliersComponenet,
    SuppliersDetailsComponent,
    AddSupplierComponent,
  ],
  imports: [
    HttpClientModule, 
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
