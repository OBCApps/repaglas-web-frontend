import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/models/functions/loading/loadings/loading-service.service';
import { GeneralFunctions } from 'src/app/models/functions/alerts-function';
import { SuppliersService } from '../suppliers.service';
import { DtoSuppliersModel } from '../models/dtoSuppliers';

@Component({
  selector: 'app-suppliers-details',
  templateUrl: './suppliers-details.component.html',
  styleUrls: ['./suppliers-details.component.scss']
})
export class SuppliersDetailsComponent extends GeneralFunctions {
  register: FormGroup;
  inputNormalLabel: any = "block  pb-[.1em] text-xs font-medium   ";
  inputNormalIn: any = "bg-white h-8 border border-[#D3DCE8] outline-none text-blue-900 text-sm  rounded focus:ring-blue-800 focus:border-blue-700 block w-full p-[1.5%]  disabled:bg-transparent border-blue-100 ";

  constructor(
    private router: Router,
    private SuppliersService: SuppliersService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private fb: FormBuilder,


  ) {
    super();
    this.register = this.fb.group({      
      id:  [{ value: '', disabled: true }],
      ruc:  [{ value: '', disabled: true }],
      razon_social:  [{ value: '', disabled: true }],
      sector:  [{ value: '', disabled: true }],
      email:  [{ value: '', disabled: true }],
      telefono:  [{ value: '', disabled: true }],
      contacto:  [{ value: '', disabled: true }],
      departamento:  [{ value: '', disabled: true }],
      direccion:  [{ value: '', disabled: true }],
      DirreccionDeRecojo:  [{ value: '', disabled: true }],
      termino_pago:  [{ value: '', disabled: true }],
    });
  }
  SupplierId : any = 0
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.SupplierId = +params['id']; // Convierte el id a un número si es necesario
      console.log(this.SupplierId);
      this.loadSupplier()
    });
    
  }

  Supplier: DtoSuppliersModel = new DtoSuppliersModel();;
  loadSupplier() {
    this.loadingService.show();
    this.SuppliersService.getSupplier(this.SupplierId).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          this.Supplier = data.detail
          //this.register.patchValue(data.detail);
          this.register.patchValue({
            id: this.Supplier.id,
            ruc: this.Supplier.RUC,
            razon_social: this.Supplier.RazonSocial,
            sector: this.Supplier.Sector,
            email: this.Supplier.Email,
            telefono: this.Supplier.Telefono,
            contacto: this.Supplier.Contacto,
            departamento: this.Supplier.Departamento,
            direccion: this.Supplier.Direccion,
            DireccionDeRecojo: this.Supplier.DireccionDeRecojo,
            termino_pago: this.Supplier.TerminoDePago,
          });
        } else {
          this.error_function(data.detail)
        }
      }, err => {
        this.error_function("Error de traer data")
      }
    )
  }
  type_solicitud: string = "profile";
  changeTypeSolicitud(value: any) {
    this.type_solicitud = value;
  }
  boolUpdate : boolean = false;
  activateUpdate(value: boolean) {
    this.boolUpdate = value;
    !value ? this.register.disable() : this.register.enable()

  }
  updateSupplier( register : any){
    this.loadingService.show();
    this.SuppliersService.updateSupplier(this.SupplierId , register).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          this.succes_function(data.detail.message);
          this.loadSupplier()
          this.activateUpdate(false)

        } else {
          this.error_function(data.detail)
        }
      }, err => {
        this.error_function("Error de traer data")
      }
    )
  }


  deleteSupplier(){
    this.loadingService.show();
    this.SuppliersService.deleteSupplier(this.SupplierId).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          this.succes_function("Eliminado Exitosamente");
          this.router.navigate(["home/suppliers"])
        } else {
          this.error_function(data.detail)
        }
      }, err => {
        this.error_function("Error de traer data")
      }
    )
  }
}
