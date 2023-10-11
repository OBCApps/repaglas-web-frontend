import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralFunctions } from 'src/app/models/functions/alerts-function';
import { MarketRatesService } from '../../market-rates.service';
import { LoadingService } from 'src/app/models/functions/loading/loadings/loading-service.service';
import { DtoMarketRatesModel } from '../../models/dtoMarketRatesModel';

@Component({
  selector: 'app-market-detail',
  templateUrl: './market-detail.component.html',
  styleUrls: ['./market-detail.component.scss']
})
export class MarketDetailComponent extends GeneralFunctions {
  register: FormGroup;
  DetailProduct: FormGroup;
  inputNormalLabel: any = "block  pb-[.1em] text-xs font-medium   ";
  inputNormalIn: any = "bg-white h-8 border border-[#D3DCE8] outline-none text-blue-900 text-sm  rounded focus:ring-blue-800 focus:border-blue-700 block w-full p-[1.5%]  disabled:bg-transparent border-blue-100 ";

  constructor(
    private router: Router,
    private marketRatesService: MarketRatesService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    super();
    this.register = this.fb.group({
      solped_cliente: [{ value: '', disabled: true }],
      ruc: [{ value: '', disabled: true }],
      vendedor: [{ value: '', disabled: true }],
      fecha_envio: [{ value: '', disabled: true }],
      estado: [{ value: '', disabled: true }],
    });

   
  }

  MarketRatesId: any = 0
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.MarketRatesId = +params['id']; // Convierte el id a un número si es necesario
      console.log(this.MarketRatesId);
      this.loadMarketRates()
      this.loadMarketRatesProducts()
    });

  }
  ProductoAgregados: any[] = []
  MarketRates: DtoMarketRatesModel = new DtoMarketRatesModel();;
  loadMarketRates() {
    this.loadingService.show();
    this.marketRatesService.getMarketDetail(this.MarketRatesId).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          this.MarketRates = data.detail
          //this.register.patchValue(data.detail);
          this.register.patchValue({
            solped_cliente: this.MarketRates.solped_cliente,
            ruc: this.MarketRates.ruc,
            vendedor: this.MarketRates.vendedor,
            fecha_envio: this.MarketRates.fecha_envio,
            estado: this.MarketRates.estado,
          });
          //this.ProductoAgregados = data.detalleProducto;

        } else {
          this.error_function(data.detail)
        }
      }, err => {
        this.loadingService.hide();
        this.error_function("Error de traer data")
      }
    )
  }
  loadMarketRatesProducts() {
    this.loadingService.show();
    this.marketRatesService.getMarketDetailProduct(this.MarketRatesId).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {


          this.ProductoAgregados = data.detail.cotizacion_detalle;

        } else {
          this.error_function(data.detail)
        }
      }, err => {
        this.loadingService.hide();
        this.error_function("Error de traer data")
      }
    )
  }
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
    this.marketRatesService.updateMarketDetail(this.MarketRatesId, register).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          this.succes_function(data.detail.message);
          this.loadMarketRates()
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

  deleteMarketRates() {
    this.loadingService.show();
    this.marketRatesService.deleteMarketRate(this.MarketRatesId).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          this.succes_function("Eliminado Exitosamente");
          this.router.navigate(["home/MarketRatess"])
        } else {
          this.error_function(data.detail)
        }
      }, err => {
        this.loadingService.hide();
        this.error_function("Error de traer data")
      }
    )
  }

  ModificarProduct(value : any){

  }
}

/* 
  - Nombre del cliente
  - 
*/


