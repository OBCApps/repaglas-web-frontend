import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliersService } from '../suppliers.service';
import { LoadingService } from 'src/app/models/functions/loading/loadings/loading-service.service';
import { GeneralFunctions } from 'src/app/models/functions/alerts-function';

@Component({
  selector: 'app-add-suppliers',
  templateUrl: './add-suppliers.component.html',
  styleUrls: ['./add-suppliers.component.scss']
})
export class AddSupplierComponent  extends GeneralFunctions{
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
        id:  [{ value : Number, disabled: false }],
        ruc:  [{ value: '', disabled: false }],
        razon_social:  [{ value: '', disabled: false }],
        sector:  [{ value: '', disabled: false }],
        email:  [{ value: '', disabled: false }],
        telefono:  [{ value: '', disabled: false }],
        contacto:  [{ value: '', disabled: false }],
        departamento:  [{ value: '', disabled: false }],
        direccion:  [{ value: '', disabled: false }],
        termino_pago:  [{ value: '', disabled: false }],
        direccionRecojo:  [{ value: '', disabled: false }],
   
    });
  }
  registerSupplier( register : any){
    this.loadingService.show();
    console.log(register);
    this.SuppliersService.createSupplier(register).subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        if (data.status_code == 200) {
          this.succes_function(data.detail.message);
          this.router.navigate(["home/suppliers"])
        } else {
          this.loadingService.show();

          this.error_function(data.detail)
        }
      }, err => {
        this.error_function("Error de traer data")
      }
    )
  }


}
