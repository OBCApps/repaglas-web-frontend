import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/models/functions/loading/loadings/loading-service.service';
import { GeneralFunctions } from 'src/app/models/functions/alerts-function';
import { ClientsService } from '../clients.service';
import { DtoClientModel } from '../models/dtoClients';

@Component({
  selector: 'app-clients-details',
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.scss']
})
export class ClientsDetailsComponent extends GeneralFunctions {
  register: FormGroup;
  inputNormalLabel: any = "block  pb-[.1em] text-xs font-medium  dark:text-white";
  inputNormalIn: any = "bg-white h-8 border border-[#D3DCE8] outline-none text-blue-900 text-sm  rounded focus:ring-blue-800 focus:border-blue-700 block w-full p-[1.5%] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-transparent border-blue-100 ";

  constructor(
    private router: Router,
    private clientsService: ClientsService,
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
      direccion_despacho:  [{ value: '', disabled: true }],
      termino_pago:  [{ value: '', disabled: true }],
    });
  }
  clientId : any = 0
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clientId = +params['id']; // Convierte el id a un número si es necesario
      console.log(this.clientId);
      this.loadClient()
    });
    
  }

  Client: DtoClientModel = new DtoClientModel();;
  loadClient() {
    this.loadingService.show();
    this.clientsService.getClient(this.clientId).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          this.Client = data.detail
          //this.register.patchValue(data.detail);
          this.register.patchValue({
            id: this.Client.id,
            ruc: this.Client.RUC,
            razon_social: this.Client.RazonSocial,
            sector: this.Client.Sector,
            email: this.Client.Email,
            telefono: this.Client.Telefono,
            contacto: this.Client.Contacto,
            departamento: this.Client.Departamento,
            direccion: this.Client.Direccion,
            direccion_despacho: this.Client.DireccionDespacho,
            termino_pago: this.Client.TerminoDePago,
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
  updateClient( register : any){
    this.loadingService.show();
    this.clientsService.updateClient(this.clientId , register).subscribe(
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
        this.error_function("Error de traer data")
      }
    )
  }

  deleteClient(){
    this.loadingService.show();
    this.clientsService.deleteClient(this.clientId).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          this.succes_function("Eliminado Exitosamente");
          this.router.navigate(["home/clients"])
        } else {
          this.error_function(data.detail)
        }
      }, err => {
        this.error_function("Error de traer data")
      }
    )
  }
}
