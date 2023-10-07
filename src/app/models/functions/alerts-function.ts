import Swal from 'sweetalert2';

export class GeneralFunctions {
    constructor(
        
    ) {

    }
    estaVacio(cadena: string): boolean {
        if (cadena == null) {
            return true;
        }
        if (cadena == undefined) {
            return true;
        }
        if (cadena.trim() === '') {
            return true;
        }
        return false;
    }
    
    isEmpty(user: any, password: any): boolean {
        if (user == null || password == null) {
            return true;
        }
        if (user == undefined || password == undefined) {
            return true;
        }
        if (user.trim() === '' || password.trim() === '') {
            return true;
        }
        return false;
    }


    error_function(sms: any) {
        Swal.fire({
            //position: 'center-end',
            icon: 'error',
            width: 400,
            title: sms,
            showConfirmButton: true,
            customClass: {
                confirmButton: 'error-confirm-buttom',
                icon: 'error-icon'
            }
            //timer: 1500
        })

    }

    succes_function(sms: any) {
        Swal.fire({
            //position: 'center-end',
            icon: 'success',
            width: 400,
            title: sms,
            showConfirmButton: true,
            timer: 2000,
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'succes-confirm-buttom',
                icon: 'succes-icon'

            }
        })

    }
    showerrorAlert(sms: any) {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Mensaje',
            text: sms,
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            background: '#ffffff',
            backdrop: false,
            showClass: {
                popup: 'animate__animated animate__slideInUp' // Agrega la clase de animación de entrada
            },
            hideClass: {
                popup: 'animate__animated animate__slideOutUp' // Agrega la clase de animación de salida
            }
        });
    }

    warning_function(sms : any ) {
        Swal.fire({
            //position: 'center-end',
            icon: 'warning',
            width: 400,
            title: sms,
            showConfirmButton: true,
            timer: 1500
        })
    }
   
}