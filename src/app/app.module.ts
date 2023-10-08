import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { LoadingsComponent } from './models/functions/loading/loadings/loadings.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './pages/nav/nav.component';
import { MarketRatesComponent } from './pages/market-rates/market-rates.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ProductsComponent } from './pages/products/products.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ClientsDetailsComponent } from './pages/clients/clients-details/clients-details.component';
import { AddClientComponent } from './pages/clients/add-client/add-client.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { ProductsDetailsComponent } from './pages/products/products-details/products-details.component';
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
  ],
  imports: [
    HttpClientModule, 
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
