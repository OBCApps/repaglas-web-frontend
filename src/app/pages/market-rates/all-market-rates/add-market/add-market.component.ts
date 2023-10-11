import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralFunctions } from 'src/app/models/functions/alerts-function';
import { MarketRatesService } from '../../market-rates.service';
import { LoadingService } from 'src/app/models/functions/loading/loadings/loading-service.service';
import { ProductsService } from 'src/app/pages/products/products.service';

@Component({
  selector: 'app-add-market',
  templateUrl: './add-market.component.html',
  styleUrls: ['./add-market.component.scss']
})
export class AddMarketComponent extends GeneralFunctions {
  register: FormGroup;
  addDetailProduct: FormGroup;
  ProductoAgregados : any [] = []
  inputNormalLabel: any = "block  pb-[.1em] text-xs font-medium   ";
  inputNormalIn: any = "bg-white h-8 border border-[#D3DCE8] outline-none text-blue-900 text-sm  rounded focus:ring-blue-800 focus:border-blue-700 block w-full p-[1.5%]  disabled:bg-transparent border-blue-100 ";
  constructor(
    private router: Router,
    private marketRatesService: MarketRatesService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productsService: ProductsService,


  ) {
    super();
    this.register = this.fb.group({
      solped_cliente: [{ value: '', disabled: false }],
      ruc: [{ value: '', disabled: false }],
      vendedor: [{ value: '', disabled: false }],
      fecha_envio: [{ value: '', disabled: false }],
      estado: [{ value: '', disabled: false }],
    });

    this.addDetailProduct = this.fb.group({
      id_cotización:[{ value: '', disabled: false }],
      solped_cliente:[{ value: '', disabled: false }],
      sku:[{ value: '', disabled: false }],
      descripcion:[{ value: '', disabled: false }],
      cantidad:[{ value: '', disabled: false }],
      precio_venta:[{ value: '', disabled: false }],
      lead_time:[{ value: '', disabled: false }],
      precio_compra:[{ value: '', disabled: false }],
      precio_original:[{ value: '', disabled: false }],
      marca_alternativa:[{ value: '', disabled: false }],
      proveedor:[{ value: '', disabled: false }],
      vendedor:[{ value: '', disabled: false }],
    });

  }

  registerMarket(register: any) {
    this.loadingService.show();
    this.marketRatesService.createMarketRates(register).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          this.succes_function(data.detail.message);
          
          //this.router.navigate(["home/all-market-rates"])
        } else {
          this.error_function(data.detail)
        }
      }, err => {
        this.error_function("Error de traer data")
      }
    )
  }

  addProductBoolean : boolean = false;
  addProduct(value : any){
    this.ProductoAgregados.push(value)
    this.addProductBoolean = false
    this.register.reset()
  }

  deleteProduct(product : any){
    const indexAEliminar = this.ProductoAgregados.findIndex(item => item.solphed_cliente === product);
    this.ProductoAgregados.splice(indexAEliminar, 1);

  }
  ListProductBoolean: boolean = false;
  ListProducts(value : any){
    this.ListProductBoolean = value;    
    if(value) {
      this.loadProducts()
    }
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



  selectProduct(item : any){
    this.addDetailProduct.patchValue({
      id_cotización: item.id_cotización,
      solped_cliente: item.solped_cliente,
      sku: item.SKU,
      descripcion: item.Descripcion,
      cantidad: item.cantidad,
      precio_venta: item.PrecioOriginal,
      lead_time: item.lead_time,
      precio_compra: item.PrecioOriginal - 100,
      precio_original: item.PrecioOriginal + 100,
      marca_alternativa: item.Marca,
      proveedor: item.proveedor,
      vendedor: "Marco Wanly Obregón Casique", // Logeado
    });
    this.addProductBoolean = true;
    this.ListProductBoolean = false
  }

  registrarCotizacion(){
    this.succes_function("Cotizacion registrada");
    this.register.reset()
    this.addDetailProduct.reset()
  }
  /* 
  Estado : Inicialmente tiene que ser PENDIENTE (El cliente genero pero no se envio )
  RUC: Verificar que el RUC existe en nuestra base de datos (Caso contrario registrarlo?)  

  En agregar la cotizacion detalle te puedo mandar una lista quienes pertenecen a ese producto
  La idea de crear la cotización es generar automáticamente los detalles de la cotización y que de esa manera este linkeado ya con el detale


  Necesitamos buscar la forma de como extraer los precios originales

  Crear tabla proveedores detalle donde tendremos registrado los precioes de compra, marca, (en procesos, traido) y nombre proveedor
  */
}
