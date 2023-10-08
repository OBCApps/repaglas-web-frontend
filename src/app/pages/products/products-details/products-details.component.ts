import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { GeneralFunctions } from 'src/app/models/functions/alerts-function';
import { LoadingService } from 'src/app/models/functions/loading/loadings/loading-service.service';
import { DtoProductsModel } from '../models/dtoProducts';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent extends GeneralFunctions {
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
      id:  [{ value: '', disabled: true }],
      sku:  [{ value: '', disabled: true }],
      description:  [{ value: '', disabled: true }],
      brand:  [{ value: '', disabled: true }],
      price:  [{ value: 0, disabled: true }],
     
    });
  }
  productId : any = 0
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = +params['id']; // Convierte el id a un número si es necesario
      console.log(this.productId);
      this.loadClient()
    });
    
  }

  Product: DtoProductsModel = new DtoProductsModel();;
  loadClient() {
    this.loadingService.show();
    this.productsService.getProduct(this.productId).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          this.Product = data.detail
          //this.register.patchValue(data.detail);
          this.register.patchValue({
            id: this.Product.id,
            sku: this.Product.SKU,
            description: this.Product.Descripcion,
            brand: this.Product.Marca,
            price: this.Product.PrecioOriginal,
          
          });
        } else {
          this.error_function(data.detail)
        }
      }, err => {
        this.loadingService.hide();
        this.error_function("Error de traer data")
      }
    )
  }
  type_solicitud: string = "product";
  changeTypeSolicitud(value: any) {
    this.type_solicitud = value;
  }
  boolUpdate : boolean = false;
  activateUpdate(value: boolean) {
    this.boolUpdate = value;
    !value ? this.register.disable() : this.register.enable()

  }
  updateProduct( register : any){
    this.loadingService.show();
    this.productsService.updateProduct(this.productId , register).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          this.succes_function(data.detail.message);
          this.loadClient()
          this.activateUpdate(false)
         /*  this.Client = data.detail
          this.register.patchValue(data.detail); */
        } else {
          this.error_function(data.detail)
        }
      }, err => {
        this.loadingService.hide();
        this.error_function("Error de traer data")
      }
    )
  }

  deleteProduct(){
    this.loadingService.show();
    this.productsService.deleteProduct(this.productId).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          this.succes_function("Eliminado Exitosamente");
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

