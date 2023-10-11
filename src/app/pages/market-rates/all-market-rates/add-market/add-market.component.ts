import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralFunctions } from 'src/app/models/functions/alerts-function';
import { MarketRatesService } from '../../market-rates.service';
import { LoadingService } from 'src/app/models/functions/loading/loadings/loading-service.service';
import { ProductsService } from 'src/app/pages/products/products.service';
import { ClientsService } from 'src/app/pages/clients/clients.service';

@Component({
  selector: 'app-add-market',
  templateUrl: './add-market.component.html',
  styleUrls: ['./add-market.component.scss']
})
export class AddMarketComponent extends GeneralFunctions {
  register: FormGroup;
  addDetailProduct: FormGroup;
  ProductoAgregados: any[] = []
  inputNormalLabel: any = "block  pb-[.1em] text-xs font-medium   ";
  inputNormalIn: any = "bg-white h-8 border border-[#D3DCE8] outline-none text-blue-900 text-sm  rounded focus:ring-blue-800 focus:border-blue-700 block w-full p-[1.5%]  disabled:bg-transparent border-blue-100 ";
  constructor(
    private router: Router,
    private marketRatesService: MarketRatesService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private clientsService: ClientsService,


  ) {
    super();
    this.register = this.fb.group({
      ruc: [{ value: '', disabled: false }],
      solped_cliente: [{ value: '', disabled: false }],
      cliente: [{ value: '', disabled: false }],
      vendedor: [{ value: '', disabled: false }],
      fecha_envio: [{ value: '', disabled: false }],
      estado: [{ value: '', disabled: false }],
      notas_abiertas: [{ value: '', disabled: false }],
    });

    this.addDetailProduct = this.fb.group({
      id_cotización: [{ value: '', disabled: false }],
      solped_cliente: [{ value: '', disabled: false }],
      sku: [{ value: '', disabled: false }],
      descripcion: [{ value: '', disabled: false }],
      cantidad: [{ value: '', disabled: false }],
      precio_venta: [{ value: '', disabled: false }],
      lead_time: [{ value: '', disabled: false }],
      precio_compra: [{ value: '', disabled: false }],
      precio_original: [{ value: '', disabled: false }],
      marca_alternativa: [{ value: '', disabled: false }],
      proveedor: [{ value: '', disabled: false }],
      vendedor: [{ value: '', disabled: false }],
    });

  }

  ngOnInit() {
    this.loadProducts()
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

  addProductBoolean: boolean = false;
  addProduct(value: any) {
    this.ProductoAgregados.push(value)
    this.addProductBoolean = false
    //this.register.reset()
    this.addDetailProduct.reset()
  }

  deleteProduct(product: any) {
    const indexAEliminar = this.ProductoAgregados.findIndex(item => item.solphed_cliente === product);
    this.ProductoAgregados.splice(indexAEliminar, 1);

  }
  ListProductBoolean: boolean = false;
  ListProducts(value: any) {
    this.ListProductBoolean = value;
    if (value) {
      this.loadProducts()
    }
  }

  Products: any = []
  loadProducts() {
    this.loadingService.show();
    this.productsService.getProducts().subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          this.Products = data.detail
        } else {
          this.error_function(data.detail)
        }
      }, err => {
        this.error_function("Error de traer data")
      }
    )
  }



  selectProduct(item: any) {
    this.addDetailProduct.patchValue({
      id_cotización: item.id_cotización,
      solped_cliente: item.solped_cliente,
      sku: item.SKU,
      descripcion: item.Descripcion,
      cantidad: item.cantidad,
      precio_venta: 0,
      lead_time: item.lead_time,
      precio_compra: 0,
      precio_original: item.PrecioOriginal,
      marca_alternativa: item.Marca,
      proveedor: item.proveedor,
      vendedor: "Marco Wanly Obregón Casique", // Logeado
    });
    this.addProductBoolean = true;
    this.ListProductBoolean = false
  }

  registrarCotizacion() {

    const data = {
      solped_cliente: this.register.value.solped_cliente,
      ruc: this.register.value.ruc,
      vendedor: "Marco Wanly Obregón Casique",
      fecha_envio: this.register.value.fecha_envio,
      estado: "PENDIENTE",
      productos: this.ProductoAgregados,
    }


    this.loadingService.show();
    this.marketRatesService.createMarketRates(data).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          this.succes_function("Cotizacion registrada");
          this.register.reset()
          this.addDetailProduct.reset()
          this.ProductoAgregados = []
        } else {
          this.error_function(data.detail)
        }
      }, err => {
        this.loadingService.hide();
        this.error_function("Error de traer data")
      }
    )
  }
  /* 
  Estado : Inicialmente tiene que ser PENDIENTE (El cliente genero pero no se envio )
  RUC: Verificar que el RUC existe en nuestra base de datos (Caso contrario registrarlo?)  

  En agregar la cotizacion detalle te puedo mandar una lista quienes pertenecen a ese producto
  La idea de crear la cotización es generar automáticamente los detalles de la cotización y que de esa manera este linkeado ya con el detale


  Necesitamos buscar la forma de como extraer los precios originales

  Crear tabla proveedores detalle donde tendremos registrado los precioes de compra, marca, (en procesos, traido) y nombre proveedor
  */
  searchRUC() {
    this.loadingService.show();
    this.clientsService.getClientByRUC(this.register.value.ruc).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          
          this.register.get('cliente').setValue(data.detail.RazonSocial)
        } else {
          this.error_function(data.detail)
        }
      }, err => {
        this.loadingService.hide();
        this.error_function("Error de traer data")
      }
    )
    
  }
  searchSKU() {
    this.loadingService.show();
    this.productsService.getProductBySku(this.addDetailProduct.value.sku).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          
          this.selectProduct(data.detail)
        } else {
          this.error_function(data.detail)
        }
      }, err => {
        this.loadingService.hide();
        this.error_function("Error de traer data")
      }
    )
    
    this.selectProduct(this.Products[this.getRandomNumber()])
  }
  ShowaddProducto() {
    this.addProductBoolean = true
  }
  getRandomNumber(): number {
    // Genera un número aleatorio entre 1 y 10
    const randomNumber = Math.floor(Math.random() * 8) + 1;
    return randomNumber;
  }
}
