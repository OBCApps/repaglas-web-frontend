import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralFunctions } from 'src/app/models/functions/alerts-function';
import { LoginService } from './login.service';
import { LoadingService } from 'src/app/models/functions/loading/loadings/loading-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends GeneralFunctions {
  // Diseño inputs formulario
  inputNormalLabel: any = "block pl-1 pb-[.1em] text-xs font-medium text-blue-900 dark:text-white";
  inputNormalIn: any = "bg-white border border-gray-300 py-[2.5%] w-[60vw] md:w-[40vw]  lg:w-[20vw] outline-none text-blue-900 text-sm  rounded focus:ring-blue-800 focus:border-blue-700 block  p-[2%] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-blue-100 border-blue-100 ";

  // USUARIO LOGIN
  usuario: any;
  password: any;

  verClave: boolean = false;
  verClaveTypeText: string = "password";

  constructor(
    private router: Router,
    private loginService: LoginService,
    private loadingService: LoadingService,


  ) {
    super()
  }
  ngOnInit() {
    //console.log("estamos aqui");
    this.login()

  }
  seleccionarVerClave() {
    this.verClave = !this.verClave;
    this.verClaveTypeText = (this.verClave) ? "text" : "password";
  }

  login() {
      this.loginService.getUsers(1).subscribe(
        response => {
          console.log(response);
          
        }
      )
  }
}
