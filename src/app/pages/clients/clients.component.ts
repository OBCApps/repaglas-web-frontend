import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from './clients.service';
import { LoadingService } from 'src/app/models/functions/loading/loadings/loading-service.service';
import { GeneralFunctions } from 'src/app/models/functions/alerts-function';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent  extends GeneralFunctions{
  constructor(
    private router: Router,
    private clientsService: ClientsService,
    private loadingService: LoadingService,
    private route: ActivatedRoute


  ) {
    super()
  } 

  ngOnInit() {
    
    this.loadClients()
  }
  Clients : any = []
  loadClients () {
    this.loadingService.show();
    this.clientsService.getClients().subscribe(
      data => {
        this.loadingService.hide();
        console.log(data);
        console.log(typeof data.detail);

        if(data.status_code == 200) {
          this.Clients = data.detail
        } else {
          this.error_function(data.detail)
        }
      } , err => {
        this.error_function("Error de traer data")
      }
    )
  }
  goToDetail(client : any){
    this.router.navigate(['home/clients-detail', client.id] );
    
  }
}
