import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralFunctions } from 'src/app/models/functions/alerts-function';
import { MarketRatesService } from '../../market-rates.service';
import { LoadingService } from 'src/app/models/functions/loading/loadings/loading-service.service';
import { DtoMarketRatesModel } from '../../models/dtoMarketRatesModel';
import { DtoAddCotizacionModel } from '../../models/dtoAddCotizacion';
import { ProductsService } from 'src/app/pages/products/products.service';
import { SuppliersService } from 'src/app/pages/suppliers/suppliers.service';

@Component({
  selector: 'app-market-detail',
  templateUrl: './market-detail.component.html',
  styleUrls: ['./market-detail.component.scss']
})
export class MarketDetailComponent extends GeneralFunctions {
  register: FormGroup;
  DetailProduct: FormGroup;
  addDetailProduct: FormGroup;
  inputNormalLabel: any = "block  pb-[.1em] text-xs font-medium   ";
  inputNormalIn: any = "bg-white h-8 w-full border border-[#D3DCE8] outline-none text-blue-900 text-sm  rounded focus:ring-blue-800 focus:border-blue-700 block  p-[1.5%]  disabled:bg-transparent border-blue-100 ";

  inputCabeceraIn: any = "bg-white h-8 border border-[#D3DCE8] outline-none text-blue-900 text-sm  rounded focus:ring-blue-800 focus:border-blue-700 block  p-[1.5%]  disabled:bg-transparent border-blue-100 ";
  constructor(
    private router: Router,
    private marketRatesService: MarketRatesService,
    private productsService: ProductsService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private suppliersService: SuppliersService,

  ) {
    super();
    this.register = this.fb.group({
      ruc: [{ value: '', disabled: false }],
      cliente: [{ value: '', disabled: false }],
      vendedor: [{ value: '', disabled: false }],
      fecha_envio: [{ value: '', disabled: false }],
      fecha_solicitud: [{ value: '', disabled: false }],
      estado: [{ value: '', disabled: false }],
      notas: [{ value: '', disabled: false }],
    });

    this.addDetailProduct = this.fb.group({
      sku: [{ value: '', disabled: false }],
      descripcion: [{ value: '', disabled: false }],
      solphed_cliente: [{ value: '', disabled: false }],
      cantidad: [{ value: '', disabled: false }],
      precio_venta: [{ value: '', disabled: false }],
      precio_compra: [{ value: '', disabled: false }],
      precio_original: [{ value: '', disabled: false }],
      marca_original: [{ value: '', disabled: false }],
      marca_alternativa: [{ value: '', disabled: false }],
      ruc_proveedor: [{ value: '', disabled: false }],
      proveedor: [{ value: '', disabled: false }],
      lead_time: [{ value: '', disabled: false }],

    });
  }

  MarketRatesId: any = 0
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.MarketRatesId = +params['id']; // Convierte el id a un número si es necesario
      console.log(this.MarketRatesId);
      this.loadMarketRates()
      //this.loadMarketRatesProducts()
    });

  }
  ProductoAgregados: any[] = []
  MarketRates: DtoAddCotizacionModel = new DtoAddCotizacionModel();;
  loadMarketRates() {
    this.loadingService.show();
    this.marketRatesService.getMarketDetail(this.MarketRatesId).subscribe(
      data => {
        this.loadingService.hide();

        this.MarketRates = data.detail

        if (!data.detail.productos) {
          this.MarketRates.productos = []
        }
        console.log("MarketRates", this.MarketRates);
        //this.register.patchValue(data.detail);
        //this.ProductoAgregados = data.detalleProducto;

      }, err => {
        this.loadingService.hide();
        this.error_function(err.error.detail.message)
      }
    )
  }
  /*  loadMarketRatesProducts() {
     this.loadingService.show();
     this.marketRatesService.getMarketDetailProduct(this.MarketRatesId).subscribe(
       data => {
         this.loadingService.hide();
         console.log(data);
         this.ProductoAgregados = data.detail.cotizacion_detalle;
 
       }, err => {
         this.loadingService.hide();
         this.error_function(err.error.detail.message)
       }
     )
   } */

  type_solicitud: string = "info";
  changeTypeSolicitud(value: any) {
    this.type_solicitud = value;
  }

  boolUpdate: boolean = false;
  activateUpdate(value: boolean) {
    this.boolUpdate = value;
    !value ? this.register.disable() : this.register.enable()

  }


  updateMarketRates(register: any) {
    this.loadingService.show();
    //this.MarketRates.productos = this.ProductoAgregados
    this.marketRatesService.updateMarketDetail(this.MarketRatesId, register).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);

        this.succes_function(data.detail.message);
        this.loadMarketRates()
        this.modificarBoolean = false


      }, err => {
        this.loadingService.hide();
        this.error_function(err.error.detail.message)
      }
    )
  }

  deleteMarketRates() {
    this.loadingService.show();
    this.marketRatesService.deleteMarketRate(this.MarketRatesId).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);

        this.succes_function("Eliminado Exitosamente");
        this.router.navigate(["home/all-market-rates"])

      }, err => {
        this.loadingService.hide();
        this.error_function(err.error.detail.message)
      }
    )
  }
  modificarBoolean: boolean = false;
  ModificarProduct(value: any) {
    if (value) {
      this.modificarBoolean = true;
    } else {
      this.modificarBoolean = false;
    }
  }


  editProduct(product: any) {
    this.editProductBoolean = true
    this.addDetailProduct.patchValue(product)
  }
  updateProduct(product: any) {
    const indexAModificar = this.MarketRates.productos.findIndex(item => item.solphed_cliente === product.solphed_cliente);
    console.log("indexAModificar", indexAModificar);

    if (indexAModificar !== -1) {
      this.MarketRates.productos[indexAModificar] = product;  // Reemplaza 'nuevoValor' con el nuevo valor que desees asignar
      // this.succes_function("Modificación Existosa")
      this.cancelEdit()
    }


  }

  cancelEdit() {
    this.editProductBoolean = false
    this.addDetailProduct.reset()
  }

  deleteProduct(product: any) {
    const indexAEliminar = this.MarketRates.productos.findIndex(item => item.solphed_cliente === product.solphed_cliente);
    this.MarketRates.productos.splice(indexAEliminar, 1);
  }

  editProductBoolean: boolean = false
  searchProveedorByRUC() {
    this.loadingService.show();
    this.suppliersService.getSupplierByRUC(this.addDetailProduct.value.ruc_proveedor).subscribe(
      data => {
        this.loadingService.hide();

        this.addDetailProduct.get('proveedor').setValue(data.detail.RazonSocial)
      }, err => {
        this.loadingService.hide();
        this.error_function(err.error.detail.message)
      }
    )
  }
  searchSKU() {
    this.loadingService.show();
    this.productsService.getProductBySku(this.addDetailProduct.value.sku).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        this.addDetailProduct.patchValue({
          descripcion: data.detail.Descripcion,
          marca_original: data.detail.Marca,
          precio_original: data.detail.PrecioOriginal,
          sku: data.detail.SKU,

        });
        //this.selectProduct(data.detail)
      }, err => {
        this.loadingService.hide();
        this.error_function(err.error.detail.message)
      }
    )
  }


}




