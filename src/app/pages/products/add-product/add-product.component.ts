import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralFunctions } from 'src/app/models/functions/alerts-function';
import { ProductsService } from '../products.service';
import { LoadingService } from 'src/app/models/functions/loading/loadings/loading-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent extends GeneralFunctions{
  register: FormGroup;
  inputNormalLabel: any = "block  pb-[.1em] text-xs font-medium  dark:text-white";
  inputNormalIn: any = "bg-white h-8 border border-[#D3DCE8] outline-none text-blue-900 text-sm  rounded focus:ring-blue-800 focus:border-blue-700 block w-full p-[1.5%] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-transparent border-blue-100 ";
  constructor(
    private router: Router,
    private productsService: ProductsService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private fb: FormBuilder,


  ) {
    super();
    this.register = this.fb.group({      
      sku:  [{ value: '', disabled: false }],
      description:  [{ value: '', disabled: false }],
      brand:  [{ value: '', disabled: false }],
      price:  [{ value: 0, disabled: false }],
      
    });
  }
  registerProduct( register : any){
    this.loadingService.show();
    this.productsService.createProducts(register).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          this.succes_function(data.detail.message);
          this.router.navigate(["home/products"])
        } else {
          this.error_function(data.detail)
        }
      }, err => {
        this.loadingService.hide();
        this.error_function("Error de traer data")
      }
    )
  }
}
