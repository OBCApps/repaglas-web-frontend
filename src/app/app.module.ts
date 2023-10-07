import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { LoadingsComponent } from './models/functions/loading/loadings/loadings.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({ 
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingsComponent,
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
