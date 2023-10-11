import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliersService } from './suppliers.service';
import { LoadingService } from 'src/app/models/functions/loading/loadings/loading-service.service';
import { GeneralFunctions } from 'src/app/models/functions/alerts-function';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponenet  extends GeneralFunctions{
  constructor(
    private router: Router,
    private SuppliersService: SuppliersService,
    private loadingService: LoadingService,
    private route: ActivatedRoute


  ) {
    super()
  } 

  ngOnInit() {
    
    this.loadSuppliers()
  }
  Suppliers : any = []
  loadSuppliers() {
    this.loadingService.show();
    this.SuppliersService.getSuppliers().subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        console.log(typeof data.detail);

        if (data.status_code === 200 && data.detail instanceof Object) {
          this.Suppliers = Object.values(data.detail);
        } else {
          this.error_function(data.detail);
        }
      },
      err => {
        this.error_function("Error al traer datos");
      }
    );
  }
  
  goToDetail(Supplier : any){
    this.router.navigate(['home/suppliers-details', Supplier.id] );
    
  }
}


export class SupplierListComponent {
  constructor(private router: Router) {}

  goToSupplierDetails(id: number) {
    this.router.navigate(['home/suppliers-detail', id]);
  }
}



