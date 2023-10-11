import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/models/functions/loading/loadings/loading-service.service';
import { GeneralFunctions } from 'src/app/models/functions/alerts-function';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends GeneralFunctions {
  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private productsService: ProductsService,


  ) {
    super()
  } 
  ngOnInit() {
    
    this.loadProducts()
  }
  Products: any = []
  loadProducts () {
    this.loadingService.show();
    this.productsService.getProducts().subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if(data.status_code == 200) {
          this.Products= data.detail
        } else {
          this.error_function(data.detail)
        }
      } , err => {
        this.error_function("Error de traer data")
      }
    )
  }
  goToDetail(client : any){
    this.router.navigate(['home/products-detail', client.id] );
    
  }
  randomDate(): string {
    const startDate = new Date(2000, 0, 1); // Año inicial
    const endDate = new Date(); // Fecha actual

    const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
    const randomDate = new Date(randomTime);

    return randomDate.toDateString();
  }
}
